"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Clock, Lightbulb, CheckCircle2, ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "@/lib/mockData";
import { SkillBadge } from "@/components/SkillBadge";
import { SavedProject } from "@/lib/types";
import { cn } from "cn";

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
  const project = projects.find((p) => p.id === id);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!project) return;
    const saved = localStorage.getItem("skillsprint-saved-projects");
    if (saved) {
      const savedProjects: SavedProject[] = JSON.parse(saved);
      if (savedProjects.some((sp) => sp.project.id === project.id)) {
        setIsSaved(true);
      }
    }
  }, [project]);

  const handleSave = () => {
    if (!project || isSaved) return;
    const saved = localStorage.getItem("skillsprint-saved-projects");
    const savedProjects: SavedProject[] = saved ? JSON.parse(saved) : [];
    
    const newSavedProject: SavedProject = {
      project,
      progress: 0,
      savedAt: new Date()
    };
    
    savedProjects.push(newSavedProject);
    localStorage.setItem("skillsprint-saved-projects", JSON.stringify(savedProjects));
    setIsSaved(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen">
        <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-3">
          <Link href="/projects" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-7 h-7 text-gray-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Project not found</h1>
          <p className="text-sm text-gray-500 mb-6">This project may have been removed or doesn't exist.</p>
          <Link href="/projects" className="text-sm text-[#4F46E5] font-medium hover:underline">
            Browse all projects
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColor = {
    Beginner: "bg-green-50 text-green-700 border-green-200",
    Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
    Advanced: "bg-red-50 text-red-700 border-red-200",
  };

  const milestones = project.milestones ?? [];
  const techStack = project.techStack ?? project.skills;

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-400">
          <Link href="/projects" className="p-1 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/projects" className="text-gray-500 hover:text-gray-700 transition-colors">Projects</Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-900 truncate max-w-[300px]">{project.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Title Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="flex items-start justify-between mb-5">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-200">
                {project.category}
              </span>
              <span className={cn("px-3 py-1 rounded-lg text-xs font-medium border", difficultyColor[project.difficulty])}>
                {project.difficulty}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-medium border border-gray-200">
                <Clock className="w-3 h-3" />
                {project.hours} hours
              </span>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isSaved
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm shadow-indigo-200"
              )}
            >
              {isSaved ? (
                <><BookmarkCheck className="w-4 h-4" /> Saved</>
              ) : (
                <><Bookmark className="w-4 h-4" /> Save Project</>
              )}
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{project.title}</h1>
          <p className="text-gray-500 leading-relaxed">{project.description}</p>
        </div>

        {/* Why Build This */}
        {project.whyThisProject && (
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">Why You Should Build This</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{project.whyThisProject}</p>
            </div>
          </div>
        )}

        {/* Skills & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-[15px] font-bold text-gray-900">Skills You'll Practice</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} variant="new" />
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <h3 className="text-[15px] font-bold text-gray-900">Suggested Tech Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border border-gray-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones */}
        {milestones.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Project Milestones</h3>
            <div className="relative ml-4 space-y-0">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-8 pb-6 last:pb-0">
                  {/* Connecting line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-[11px] top-[28px] bottom-0 w-[2px] bg-gray-200" />
                  )}
                  {/* Step circle */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center text-white font-bold text-[11px] shadow-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-1">{milestone.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
