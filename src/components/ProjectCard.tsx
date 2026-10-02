"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { cn } from 'cn';
import { Project } from '@/lib/types';
import SkillBadge from '@/components/SkillBadge';

interface ProjectCardProps {
  project: Project;
  matchingSkills?: string[];
  relevanceScore?: number;
}

export function ProjectCard({ project, matchingSkills = [], relevanceScore }: ProjectCardProps) {
  const difficultyColor = {
    Beginner: 'bg-green-400',
    Intermediate: 'bg-amber-400',
    Advanced: 'bg-red-400',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
          {project.category}
        </span>
        {relevanceScore !== undefined && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
            {Math.round(relevanceScore * 100)}% relevant
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.skills.map((skill) => (
          <SkillBadge 
            key={skill} 
            skill={skill} 
            variant={matchingSkills.includes(skill) ? 'missing' : 'default'} 
          />
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-5 mt-auto">
        <span className="flex items-center gap-1">
          <span className={cn('w-2 h-2 rounded-full', difficultyColor[project.difficulty])} />
          {project.difficulty}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {project.hours} hours
        </span>
      </div>
      
      <Link 
        href={`/projects/${project.id}`}
        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 transition-colors"
      >
        View Project <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default ProjectCard;
