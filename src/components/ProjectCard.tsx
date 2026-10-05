"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Bookmark, BookmarkCheck, Zap } from 'lucide-react';
import { cn } from 'cn';
import { Project, SavedProject } from '@/lib/types';

const SAVED_PROJECTS_KEY = 'skillsprint-saved-projects';

const categoryStyles: Record<string, { bg: string; text: string; iconBg: string }> = {
  Backend:            { bg: 'bg-blue-50',    text: 'text-blue-700',    iconBg: 'bg-blue-100' },
  Cloud:              { bg: 'bg-sky-50',     text: 'text-sky-700',     iconBg: 'bg-sky-100' },
  DevOps:             { bg: 'bg-orange-50',  text: 'text-orange-700',  iconBg: 'bg-orange-100' },
  'AI/ML':            { bg: 'bg-purple-50',  text: 'text-purple-700',  iconBg: 'bg-purple-100' },
  Systems:            { bg: 'bg-red-50',     text: 'text-red-700',     iconBg: 'bg-red-100' },
  'Data Engineering': { bg: 'bg-teal-50',    text: 'text-teal-700',    iconBg: 'bg-teal-100' },
  Databases:          { bg: 'bg-emerald-50', text: 'text-emerald-700', iconBg: 'bg-emerald-100' },
  Security:           { bg: 'bg-rose-50',    text: 'text-rose-700',    iconBg: 'bg-rose-100' },
  Frontend:           { bg: 'bg-pink-50',    text: 'text-pink-700',    iconBg: 'bg-pink-100' },
  'Developer Tools':  { bg: 'bg-slate-50',   text: 'text-slate-700',   iconBg: 'bg-slate-100' },
  Mobile:             { bg: 'bg-violet-50',  text: 'text-violet-700',  iconBg: 'bg-violet-100' },
};

const difficultyDot: Record<string, string> = {
  Beginner: 'bg-green-400',
  Intermediate: 'bg-amber-400',
  Advanced: 'bg-red-400',
};

interface ProjectCardProps {
  project: Project;
  matchedGapSkills?: string[];
  relevanceScore?: number;
  explanation?: string;
}

export function ProjectCard({ project, matchedGapSkills = [], relevanceScore, explanation }: ProjectCardProps) {
  const style = categoryStyles[project.category] || categoryStyles.Backend;
  const visibleSkills = project.skills.slice(0, 3);
  const extraCount = project.skills.length - 3;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_PROJECTS_KEY);
    if (saved) {
      const savedProjects: SavedProject[] = JSON.parse(saved);
      setIsSaved(savedProjects.some((sp) => sp.project.id === project.id));
    }
  }, [project.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    const saved = localStorage.getItem(SAVED_PROJECTS_KEY);
    const savedProjects: SavedProject[] = saved ? JSON.parse(saved) : [];

    if (isSaved) {
      const updated = savedProjects.filter((sp) => sp.project.id !== project.id);
      localStorage.setItem(SAVED_PROJECTS_KEY, JSON.stringify(updated));
      setIsSaved(false);
    } else {
      const updated = [...savedProjects, { project, progress: 0, savedAt: new Date().toISOString() }];
      localStorage.setItem(SAVED_PROJECTS_KEY, JSON.stringify(updated));
      setIsSaved(true);
    }
  };

  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold", style.iconBg, style.text)}>
            {project.category.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-gray-900 leading-tight group-hover:text-[#4F46E5] transition-colors line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{project.category}</p>
          </div>
          <button
            onClick={toggleSave}
            aria-label={isSaved ? 'Remove from My Projects' : 'Save to My Projects'}
            className={cn(
              "transition-colors flex-shrink-0 mt-0.5",
              isSaved ? "text-[#4F46E5]" : "text-gray-300 hover:text-[#4F46E5]"
            )}
          >
            {isSaved ? <BookmarkCheck className="w-[18px] h-[18px]" /> : <Bookmark className="w-[18px] h-[18px]" />}
          </button>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1.5">
            <span className={cn("w-2 h-2 rounded-full", difficultyDot[project.difficulty])} />
            {project.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {project.hours}h
          </span>
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
          {visibleSkills.map((skill) => {
            const isGap = matchedGapSkills.some((g) => g.toLowerCase() === skill.toLowerCase());
            return (
              <span
                key={skill}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-md font-medium",
                  isGap
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {skill}
              </span>
            );
          })}
          {extraCount > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 text-gray-400 font-medium">
              +{extraCount} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Generated just now</span>
          {matchedGapSkills.length > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <Zap className="w-3 h-3" />
              Closes {matchedGapSkills.length} gap{matchedGapSkills.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
