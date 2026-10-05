"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Briefcase, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { userSkills as defaultUserSkills, targetSkills as defaultTargetSkills, mockSkillGapResult } from "@/lib/mockData";
import { ProgressBar } from "@/components/ProgressBar";
import { SkillGapCard } from "@/components/SkillGapCard";
import { ApiResponse } from "@/lib/types";

export default function ResultsPage() {
  const [analysis, setAnalysis] = useState<{
    userSkills: string[];
    targetSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
    jobCount: number;
  }>({
    userSkills: defaultUserSkills,
    targetSkills: defaultTargetSkills,
    missingSkills: mockSkillGapResult.missingSkills,
    matchPercentage: mockSkillGapResult.matchPercentage,
    jobCount: 1,
  });

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("skillsprint-analysis-result") || localStorage.getItem("skillsprint-analysis-result");
      if (stored) {
        const data: ApiResponse = JSON.parse(stored);
        if (data.current_skills && data.target_skills) {
          const current = data.current_skills;
          const target = data.target_skills;
          const gaps = data.skill_gaps || [];

          const matchPct = target.length > 0
            ? Math.max(10, Math.min(95, Math.round(((target.length - gaps.length) / target.length) * 100)))
            : 68;

          setAnalysis({
            userSkills: current,
            targetSkills: target,
            missingSkills: gaps,
            matchPercentage: matchPct,
            jobCount: 1,
          });
        }
      }
    } catch (e) {
      console.error("Error reading stored analysis result:", e);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">Skill Gap Analysis</span>
          <span className="text-gray-300">&middot;</span>
          <span className="text-gray-500">Based on your resume and target role requirements</span>
        </div>
      </div>

      <div className="p-6 max-w-[1100px] space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-xl text-center">
            <ProgressBar percentage={analysis.matchPercentage} size="lg" />
            <p className="mt-6 font-semibold text-gray-900 text-lg">Estimated skill overlap</p>
            <p className="text-sm text-gray-500 mt-2 max-w-[250px]">
              Calculated via sentence embeddings semantic matching
            </p>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <SkillGapCard 
              title="Your Current Skills"
              skills={analysis.userSkills}
              variant="current"
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            />
            <SkillGapCard 
              title="Target Job Requirements"
              skills={analysis.targetSkills}
              variant="required"
              icon={<Briefcase className="w-5 h-5 text-[#4F46E5]" />}
            />
            <SkillGapCard 
              title="Skills to Develop"
              skills={analysis.missingSkills.length > 0 ? analysis.missingSkills : ["All target skills matched!"]}
              variant="missing"
              icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Link 
            href="/projects" 
            className="inline-flex items-center justify-center bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl px-8 py-3.5 text-base font-medium shadow-md shadow-indigo-200/60 hover:shadow-lg transition-all"
          >
            View Project Recommendations <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
