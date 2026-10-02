"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, Trash2, Clock } from "lucide-react";
import { SavedProject } from "@/lib/types";
import { SkillBadge } from "@/components/SkillBadge";

export default function MyProjects() {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = () => {
      const saved = localStorage.getItem("skillsprint-saved-projects");
      if (saved) {
        setSavedProjects(JSON.parse(saved));
      }
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  const removeProject = (projectId: string) => {
    const updated = savedProjects.filter((sp) => sp.project.id !== projectId);
    setSavedProjects(updated);
    localStorage.setItem("skillsprint-saved-projects", JSON.stringify(updated));
  };

  if (isLoading) {
    return <div className="max-w-6xl mx-auto py-12 px-6">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
        <p className="text-gray-600 text-lg">Track your progress on saved projects</p>
      </div>

      {savedProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 border-dashed p-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <FolderOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No projects saved yet</h2>
          <p className="text-gray-500 max-w-md mb-8">
            Browse project recommendations and add projects you want to work on.
          </p>
          <Link 
            href="/projects" 
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            Browse Projects
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedProjects.map((sp) => (
            <div key={sp.project.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sp.project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    sp.project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {sp.project.difficulty}
                  </span>
                  <span className="flex items-center text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {sp.project.hours}h
                  </span>
                </div>
                <button 
                  onClick={() => removeProject(sp.project.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Remove project"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{sp.project.title}</h3>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                {sp.project.skills.slice(0, 3).map((skill) => (
                  <SkillBadge key={skill} skill={skill} variant="new" />
                ))}
                {sp.project.skills.length > 3 && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                    +{sp.project.skills.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-emerald-600">{sp.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${sp.progress}%` }}></div>
                </div>
                
                <Link 
                  href={`/projects/${sp.project.id}`}
                  className="block w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-center text-gray-700 font-medium rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
