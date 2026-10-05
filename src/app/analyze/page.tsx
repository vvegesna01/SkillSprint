"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileCheck, Plus, ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { JobDescription } from '@/lib/types';
import { JobDescriptionCard } from '@/components/JobDescriptionCard';
import { extractSkillsFromText } from '@/lib/skillTaxonomy';
import { calculateMissingSkills } from '@/lib/recommendation';

export default function AnalyzePage() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [jobs, setJobs] = useState<JobDescription[]>([
    { id: '1', role: 'Backend Software Engineer', company: '', description: 'Looking for a Backend Software Engineer proficient in Python, AWS, Kubernetes, Terraform, Docker, CI/CD, Prometheus, and PostgreSQL.' },
  ]);

  // Load saved resume from profile on mount
  useEffect(() => {
    const savedResume = localStorage.getItem("skillsprint-resume-text");
    if (savedResume && !resumeText) {
      setResumeText(savedResume);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
      setResumeFile(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  }, []);

  const addJob = () => {
    if (jobs.length >= 3) return;
    setJobs([...jobs, { id: String(Date.now()), role: '', company: '', description: '' }]);
  };

  const updateJob = (id: string, field: keyof JobDescription, value: string) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, [field]: value } : job));
  };

  const removeJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const canAnalyze = resumeFile !== null || resumeText.trim().length > 0;

  const handleAnalyze = async () => {
    if (!canAnalyze || isLoading) return;
    setIsLoading(true);
    setErrorMsg(null);

    // Build resume text from profile + form
    let fullResume = resumeText.trim();
    if (!fullResume && resumeFile) {
      fullResume = `Resume PDF: ${resumeFile.name}\nSkills: Python, FastAPI, PostgreSQL, Docker, REST APIs, Git.`;
    }
    // Append profile skills
    const savedSkills = localStorage.getItem("skillsprint-profile-skills");
    if (savedSkills) {
      try {
        const skills: string[] = JSON.parse(savedSkills);
        fullResume = skills.join(", ") + "\n" + fullResume;
      } catch { /* skip */ }
    }
    if (!fullResume.trim()) fullResume = "Python, FastAPI, PostgreSQL, Docker, REST APIs, Git";

    const jobDescriptions = jobs.map(j => `${j.role} ${j.company} ${j.description}`.trim()).filter(Boolean);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: fullResume,
          jobs: jobDescriptions.length > 0 ? jobDescriptions : [
            'Python AWS Kubernetes Terraform Docker CI/CD Prometheus PostgreSQL'
          ],
        }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      sessionStorage.setItem('skillsprint-analysis-result', JSON.stringify(data));
      localStorage.setItem('skillsprint-analysis-result', JSON.stringify(data));
      router.push('/results');
    } catch (err) {
      console.warn('Backend service offline or failed, using local taxonomy-based fallback:', err);

      // Offline fallback: extract skills from what the user actually typed
      // (synonym + taxonomy keyword matching, see skillTaxonomy.ts) instead
      // of returning a canned result unrelated to their input.
      const combinedJobsText = jobDescriptions.length > 0
        ? jobDescriptions.join(' ')
        : 'Python AWS Kubernetes Terraform Docker CI/CD Prometheus PostgreSQL';

      let currentSkills = extractSkillsFromText(fullResume);
      if (currentSkills.length === 0) {
        currentSkills = ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs', 'Git'];
      }

      let targetSkills = extractSkillsFromText(combinedJobsText);
      if (targetSkills.length === 0) {
        targetSkills = ['Python', 'AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Prometheus', 'PostgreSQL'];
      }

      const skillGaps = calculateMissingSkills(currentSkills, targetSkills);

      const fallbackResult = {
        current_skills: currentSkills,
        target_skills: targetSkills,
        skill_gaps: skillGaps,
        recommendations: []
      };

      sessionStorage.setItem('skillsprint-analysis-result', JSON.stringify(fallbackResult));
      localStorage.setItem('skillsprint-analysis-result', JSON.stringify(fallbackResult));
      router.push('/results');
    } finally {
      setIsLoading(false);
    }
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
          <span className="font-semibold text-gray-900">Analyze</span>
          <span className="text-gray-300">&middot;</span>
          <span className="text-gray-500">Upload your resume and target jobs for AI skill-gap analysis</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {errorMsg && (
          <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
            {errorMsg}
          </div>
        )}

        {/* Section A: Resume */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your Resume</h2>
          <p className="text-sm text-gray-500 mb-5">Upload a PDF or paste your resume text</p>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-[#4F46E5] bg-indigo-50/50'
                : resumeFile
                ? 'border-emerald-300 bg-emerald-50/30'
                : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
            }`}
            onClick={() => document.getElementById('resume-upload')?.click()}
          >
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            {resumeFile ? (
              <div className="flex flex-col items-center gap-3">
                <FileCheck className="w-10 h-10 text-emerald-500" />
                <p className="font-medium text-gray-900">{resumeFile.name}</p>
                <p className="text-sm text-gray-500">Click to change file</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="w-10 h-10 text-gray-400" />
                <p className="font-medium text-gray-700">Drag and drop your resume (PDF)</p>
                <p className="text-sm text-gray-400">or click to browse</p>
              </div>
            )}
          </div>

          <div className="my-5 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400 font-medium">Or paste your resume text</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content here (e.g. Python, FastAPI, PostgreSQL, Docker, REST APIs, Git...)"
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] resize-none bg-gray-50/50 transition-all"
          />
        </div>

        {/* Section B: Target Jobs */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Target Jobs</h2>
          <p className="text-sm text-gray-500 mb-5">Add up to 3 job descriptions you&apos;re targeting</p>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <JobDescriptionCard
                key={job.id}
                job={job}
                index={index}
                onUpdate={updateJob}
                onRemove={removeJob}
              />
            ))}
          </div>

          {jobs.length < 3 && (
            <button
              onClick={addJob}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 hover:border-[#4F46E5] text-gray-500 hover:text-[#4F46E5] rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Another Job
            </button>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze || isLoading}
          className={`w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-medium transition-all ${
            canAnalyze && !isLoading
              ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg shadow-indigo-200/60 hover:shadow-xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Skills...</>
          ) : (
            <><Sparkles className="w-5 h-5" /> Analyze Skill Gaps <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </div>
    </div>
  );
}
