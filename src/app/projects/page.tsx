"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Search, ChevronDown, ArrowLeft, ArrowRight, Loader2, X, SlidersHorizontal, Sparkles } from "lucide-react";
import { cn } from "cn";
import { ProjectCard } from "@/components/ProjectCard";
import { projects as allProjects } from "@/lib/projects";
import { recommendProjects } from "@/lib/recommendation";
import { extractSkillsFromText } from "@/lib/skillTaxonomy";
import type { Project, ApiResponse } from "@/lib/types";

type CategoryFilter = "All" | "Backend" | "Cloud" | "AI/ML" | "DevOps" | "Systems" | "Frontend" | "Data Engineering" | "Databases" | "Security" | "Developer Tools" | "Mobile";
type DifficultyFilter = "All" | "Beginner" | "Intermediate" | "Advanced";
type TimeFilter = "All" | "< 10 hours" | "10–20 hours" | "20+ hours";

interface ProjectResult {
  project: Project;
  matchedGapSkills: string[];
  score: number;
  explanation: string;
}

const categories: CategoryFilter[] = ["All", "Backend", "Cloud", "AI/ML", "DevOps", "Systems", "Frontend", "Data Engineering", "Databases", "Security"];
const difficulties: DifficultyFilter[] = ["All", "Beginner", "Intermediate", "Advanced"];
const times: TimeFilter[] = ["All", "< 10 hours", "10–20 hours", "20+ hours"];

function FilterDropdown({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors",
          value !== "All"
            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        )}
      >
        {label}{value !== "All" ? `: ${value}` : ""}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 min-w-[160px]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors",
                value === opt ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProjectResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("All");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("All");

  // On mount, try to load existing results
  useEffect(() => {
    const savedQuery = sessionStorage.getItem("skillsprint-search-query");
    if (savedQuery) setSearchQuery(savedQuery);

    const stored = sessionStorage.getItem("skillsprint-analysis-result");
    if (stored) {
      try {
        const data: ApiResponse = JSON.parse(stored);
        if (data.recommendations && data.recommendations.length > 0) {
          setResults(data.recommendations.map((r) => ({
            project: r.project,
            matchedGapSkills: r.matched_gap_skills || [],
            score: r.score,
            explanation: r.explanation || "",
          })));
          setHasSearched(true);
          return;
        }
      } catch { /* fall through */ }
    }

    // Fallback: use local recommendation engine with saved profile
    loadLocalRecommendations();
  }, []);

  const loadLocalRecommendations = useCallback(() => {
    let userSkills = ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Git"];
    const savedSkills = localStorage.getItem("skillsprint-profile-skills");
    if (savedSkills) {
      try { userSkills = JSON.parse(savedSkills); } catch { /* use defaults */ }
    }

    const targetSkills = ["Python", "AWS", "Kubernetes", "Terraform", "Docker", "CI/CD", "Prometheus", "PostgreSQL"];
    const recs = recommendProjects(userSkills, targetSkills, allProjects);

    setResults(recs.map((r) => ({
      project: r.project,
      matchedGapSkills: r.matchedGapSkills,
      score: r.score,
      explanation: r.explanation,
    })));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    sessionStorage.setItem("skillsprint-search-query", searchQuery);

    // Build resume from profile
    let resumeText = "";
    const savedSkills = localStorage.getItem("skillsprint-profile-skills");
    if (savedSkills) {
      try { resumeText += JSON.parse(savedSkills).join(", "); } catch { /* skip */ }
    }
    const savedResume = localStorage.getItem("skillsprint-resume-text");
    if (savedResume) resumeText += "\n" + savedResume;
    if (!resumeText.trim()) resumeText = "Python, FastAPI, PostgreSQL, Docker, REST APIs, Git";

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText, jobs: [searchQuery] }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data: ApiResponse = await res.json();

      sessionStorage.setItem("skillsprint-analysis-result", JSON.stringify(data));

      if (data.recommendations && data.recommendations.length > 0) {
        setResults(data.recommendations.map((r) => ({
          project: r.project,
          matchedGapSkills: r.matched_gap_skills || [],
          score: r.score,
          explanation: r.explanation || "",
        })));
      } else {
        // API returned no recommendations, use local engine with API gaps
        const recs = recommendProjects(data.current_skills, data.target_skills, allProjects);
        setResults(recs.map((r) => ({
          project: r.project,
          matchedGapSkills: r.matchedGapSkills,
          score: r.score,
          explanation: r.explanation,
        })));
      }
    } catch (err) {
      console.warn("Backend offline, falling back to local engine:", err);

      let userSkills = ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Git"];
      const skills = localStorage.getItem("skillsprint-profile-skills");
      if (skills) { try { userSkills = JSON.parse(skills); } catch { /* skip */ } }

      // Extract candidate target skills from the query against the known
      // skill taxonomy (synonym + keyword matching — see skillTaxonomy.ts)
      const extracted = extractSkillsFromText(searchQuery);
      const targetSkills = extracted.length > 0
        ? extracted
        : searchQuery.split(/[\s,;.]+/).filter((w) => w.length > 1);
      const recs = recommendProjects(userSkills, targetSkills, allProjects);
      setResults(recs.map((r) => ({
        project: r.project,
        matchedGapSkills: r.matchedGapSkills,
        score: r.score,
        explanation: r.explanation,
      })));
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Apply client-side filters
  const filteredResults = useMemo(() => {
    return results.filter(({ project }) => {
      if (categoryFilter !== "All" && project.category !== categoryFilter) return false;
      if (difficultyFilter !== "All" && project.difficulty !== difficultyFilter) return false;
      if (timeFilter === "< 10 hours" && project.hours >= 10) return false;
      if (timeFilter === "10–20 hours" && (project.hours < 10 || project.hours > 20)) return false;
      if (timeFilter === "20+ hours" && project.hours < 20) return false;
      return true;
    });
  }, [results, categoryFilter, difficultyFilter, timeFilter]);

  const clearFilters = () => {
    setCategoryFilter("All");
    setDifficultyFilter("All");
    setTimeFilter("All");
  };

  const hasActiveFilters = categoryFilter !== "All" || difficultyFilter !== "All" || timeFilter !== "All";

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">Projects</span>
          <span className="text-gray-300">&middot;</span>
          <span className="text-gray-500">Discover projects to close your skill gaps</span>
        </div>
      </div>

      <div className="p-6 max-w-[1200px]">
        {/* Search Bar */}
        <div className="flex gap-2 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
              placeholder="Describe your target role (e.g. Backend Engineer with AWS and Kubernetes)"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-white transition-all"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!searchQuery.trim() || isLoading}
            className={cn(
              "px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0",
              searchQuery.trim() && !isLoading
                ? "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm shadow-indigo-200"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate Projects</>
            )}
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 mr-1" />
          <FilterDropdown label="Category" options={categories} value={categoryFilter} onChange={(v) => setCategoryFilter(v as CategoryFilter)} />
          <FilterDropdown label="Difficulty" options={difficulties} value={difficultyFilter} onChange={(v) => setDifficultyFilter(v as DifficultyFilter)} />
          <FilterDropdown label="Time" options={times} value={timeFilter} onChange={(v) => setTimeFilter(v as TimeFilter)} />
          <div className="flex-1" />
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
              Clear Filters
            </button>
          )}
          <span className="text-sm text-gray-400 font-medium">
            {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse">
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-3 bg-gray-100 rounded w-16" />
                  <div className="h-3 bg-gray-100 rounded w-12" />
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-100 rounded-md w-16" />
                  <div className="h-6 bg-gray-100 rounded-md w-20" />
                  <div className="h-6 bg-gray-100 rounded-md w-14" />
                </div>
                <div className="h-px bg-gray-100 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-24" />
              </div>
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResults.map(({ project, matchedGapSkills, score, explanation }) => (
              <ProjectCard
                key={project.id}
                project={project}
                matchedGapSkills={matchedGapSkills}
                relevanceScore={score}
                explanation={explanation}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredResults.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-400" />
            </div>
            {hasSearched ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects match your filters</h3>
                <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                  Try adjusting your filters or searching for a different role.
                </p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-sm text-[#4F46E5] font-medium hover:underline">
                    Clear all filters
                  </button>
                )}
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Describe your target role to get started</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Enter a job title or description above and click &quot;Generate Projects&quot; to discover curated projects that close your skill gaps.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
