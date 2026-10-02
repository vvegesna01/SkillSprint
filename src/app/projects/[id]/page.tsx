"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Clock, Lightbulb, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "@/lib/mockData";
import { SkillBadge } from "@/components/SkillBadge";
import { SavedProject } from "@/lib/types";

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
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/projects" className="text-emerald-600 hover:underline">
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link href="/projects" className="inline-block text-emerald-600 hover:text-emerald-700 font-medium mb-6">
        &larr; Back to Projects
      </Link>
      
      <div className="bg-white rounded-xl border p-8 mb-8 shadow-sm">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {project.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
            project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {project.difficulty}
          </span>
          <span className="flex items-center text-gray-500 text-sm ml-auto">
            <Clock className="w-4 h-4 mr-1" />
            {project.hours} hours
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{project.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{project.description}</p>
        
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            isSaved 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500" />
              Added to My Projects ✓
            </>
          ) : (
            'Add to My Projects'
          )}
        </button>
      </div>

      <div className="bg-emerald-50/50 border border-emerald-100 border-l-4 border-l-emerald-500 rounded-lg p-6 mb-8 flex gap-4">
        <div className="mt-1">
          <Lightbulb className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Why You Should Build This</h3>
          <p className="text-gray-700 leading-relaxed">{project.whyThisProject}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Skills You'll Practice</h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} variant="new" />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Suggested Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Project Milestones</h3>
        <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-4">
          {project.milestones.map((milestone, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {index + 1}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h4>
              <p className="text-gray-600">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
