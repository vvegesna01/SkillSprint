"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Briefcase, AlertCircle, ArrowRight } from "lucide-react";
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
    <div className="container mx-auto py-12 px-4 max-w-6xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Your Skill Gap Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Based on your resume and target role requirements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center justify-center p-8 bg-card border rounded-xl shadow-sm text-center">
          <ProgressBar percentage={analysis.matchPercentage} size="lg" />
          <p className="mt-6 font-medium text-lg">Estimated skill overlap</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-[250px]">
            Calculated via sentence embeddings semantic matching
          </p>
        </div>

        <div className="lg:col-span-2 space-y-6">
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
            icon={<Briefcase className="w-5 h-5 text-blue-500" />}
          />
          <SkillGapCard 
            title="Skills to Develop"
            skills={analysis.missingSkills.length > 0 ? analysis.missingSkills : ["All target skills matched!"]}
            variant="missing"
            icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
          />
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Link 
          href="/projects" 
          className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-4 text-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          View Project Recommendations <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
