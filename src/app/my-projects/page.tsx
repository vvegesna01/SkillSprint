"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, Trash2, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { SavedProject } from "@/lib/types";
import { SkillBadge } from "@/components/SkillBadge";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-50 text-green-700 border-green-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-red-50 text-red-700 border-red-200",
};

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

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">My Projects</span>
          <span className="text-gray-300">&middot;</span>
          <span className="text-gray-500">Track your progress on saved projects</span>
        </div>
      </div>

      <div className="p-6 max-w-[1200px]">
        {isLoading ? (
          <div className="py-20 text-center text-gray-400 text-sm">Loading...</div>
        ) : savedProjects.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects saved yet</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
              Browse project recommendations and save the ones you want to work on — they&apos;ll show up here so you can track progress.
            </p>
            <Link href="/projects" className="text-sm text-[#4F46E5] font-medium hover:underline">
              Browse projects
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedProjects.map((sp) => (
              <div key={sp.project.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2.5 py-0.5 rounded-lg font-medium border ${difficultyColor[sp.project.difficulty]}`}>
                      {sp.project.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {sp.project.hours}h
                    </span>
                  </div>
                  <button
                    onClick={() => removeProject(sp.project.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label="Remove project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-[15px] font-semibold text-gray-900 leading-tight mb-3 line-clamp-2">
                  {sp.project.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
                  {sp.project.skills.slice(0, 3).map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="new" />
                  ))}
                  {sp.project.skills.length > 3 && (
                    <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-md text-xs font-medium">
                      +{sp.project.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs font-medium text-gray-500">Progress</span>
                    <span className="text-xs font-bold text-[#4F46E5]">{sp.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div className="bg-[#4F46E5] h-2 rounded-full transition-all" style={{ width: `${sp.progress}%` }} />
                  </div>

                  <Link
                    href={`/projects/${sp.project.id}`}
                    className="block w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-center text-gray-700 text-sm font-medium rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
