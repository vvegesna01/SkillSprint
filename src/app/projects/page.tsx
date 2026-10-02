"use client";

import { useState, useMemo } from "react";
import { projects, mockSkillGapResult } from "@/lib/mockData";
import { recommendProjects } from "@/lib/recommendation";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "cn";

type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
type TimeFilter = 'All' | '< 10 hours' | '10–20 hours' | '20+ hours';
type CategoryFilter = 'All' | 'Backend' | 'Cloud' | 'AI/ML' | 'DevOps' | 'Systems' | 'Frontend';

const difficulties: Difficulty[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const times: TimeFilter[] = ['All', '< 10 hours', '10–20 hours', '20+ hours'];
const categories: CategoryFilter[] = ['All', 'Backend', 'Cloud', 'AI/ML', 'DevOps', 'Systems', 'Frontend'];

export default function ProjectsPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>('All');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');

  const recommendedProjects = useMemo(() => {
    return recommendProjects(mockSkillGapResult.missingSkills, projects);
  }, []);

  const filteredProjects = useMemo(() => {
    return recommendedProjects.filter(({ project }) => {
      // Difficulty filter
      if (difficultyFilter !== 'All' && project.difficulty !== difficultyFilter) return false;
      
      // Category filter
      if (categoryFilter !== 'All' && project.category !== categoryFilter) return false;
      
      // Time filter
      if (timeFilter === '< 10 hours' && project.hours >= 10) return false;
      if (timeFilter === '10–20 hours' && (project.hours < 10 || project.hours > 20)) return false;
      if (timeFilter === '20+ hours' && project.hours < 20) return false;
      
      return true;
    });
  }, [recommendedProjects, difficultyFilter, timeFilter, categoryFilter]);

  const FilterPill = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
        active 
          ? "bg-emerald-600 text-white" 
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Projects that close your gaps</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          These projects were selected because they help you practice skills that appear frequently in your target roles.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(d => (
              <FilterPill key={d} active={difficultyFilter === d} label={d} onClick={() => setDifficultyFilter(d)} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Time Required</h3>
          <div className="flex flex-wrap gap-2">
            {times.map(t => (
              <FilterPill key={t} active={timeFilter === t} label={t} onClick={() => setTimeFilter(t)} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <FilterPill key={c} active={categoryFilter === c} label={c} onClick={() => setCategoryFilter(c)} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(({ project, matchingSkills, relevanceScore }) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                matchingSkills={matchingSkills}
                relevanceScore={relevanceScore}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-card border rounded-xl">
            <p className="text-xl text-muted-foreground">No projects match your current filters.</p>
            <button 
              onClick={() => {
                setDifficultyFilter('All');
                setTimeFilter('All');
                setCategoryFilter('All');
              }}
              className="mt-4 text-emerald-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
