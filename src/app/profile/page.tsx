"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Check, Circle, Upload, Save, X, Plus, UserCircle } from "lucide-react";
import { cn } from "cn";

const tabs = ["Personal Info", "Experience", "Education", "Projects", "Skills"] as const;
type Tab = (typeof tabs)[number];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Skills");

  // Skills state
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // Resume state
  const [resumeText, setResumeText] = useState("");
  const [resumeSaved, setResumeSaved] = useState(false);

  // Profile progress
  const [progress, setProgress] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSkills = localStorage.getItem("skillsprint-profile-skills");
    if (savedSkills) {
      try {
        setSkills(JSON.parse(savedSkills));
      } catch {
        setSkills(["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Git"]);
      }
    } else {
      const defaults = ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Git"];
      setSkills(defaults);
      localStorage.setItem("skillsprint-profile-skills", JSON.stringify(defaults));
    }

    const savedResume = localStorage.getItem("skillsprint-resume-text");
    if (savedResume) {
      setResumeText(savedResume);
      setResumeSaved(true);
    }
  }, []);

  // Persist skills
  useEffect(() => {
    if (skills.length > 0) {
      localStorage.setItem("skillsprint-profile-skills", JSON.stringify(skills));
    }
  }, [skills]);

  // Calculate progress
  useEffect(() => {
    let p = 0;
    if (skills.length > 0) p += 30;
    if (resumeText.trim().length > 0 && resumeSaved) p += 40;
    const hasAnalysis = typeof window !== "undefined" && sessionStorage.getItem("skillsprint-analysis-result");
    if (hasAnalysis) p += 30;
    setProgress(p);
  }, [skills, resumeText, resumeSaved]);

  const addSkill = useCallback(() => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkills((prev) => [...prev, trimmed]);
      setSkillInput("");
    }
  }, [skillInput, skills]);

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const saveResume = () => {
    localStorage.setItem("skillsprint-resume-text", resumeText);
    setResumeSaved(true);
  };

  // SVG progress ring
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <button className="p-1 hover:text-gray-600 transition-colors"><ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">Profile</span>
          <span className="text-gray-300">&middot;</span>
          <span className="text-gray-500">Build your master profile to unlock AI-powered skill analysis. ✨ The more you add, the better the recommendations.</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-3 text-sm font-medium transition-colors relative",
                activeTab === tab
                  ? "text-[#4F46E5]"
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F46E5] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 p-6 max-w-[1200px]">
        {/* Left Panel */}
        <div className="flex-1 min-w-0">
          {activeTab === "Skills" ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Your Skills</h2>
                  <p className="text-sm text-gray-500 mt-1">Add the technical skills you already know</p>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  {skills.length} skills
                </span>
              </div>

              {/* Add skill input */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Add a skill (e.g. Python, AWS, Kubernetes...)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all bg-gray-50/50"
                  />
                </div>
                <button
                  onClick={addSkill}
                  disabled={!skillInput.trim()}
                  className={cn(
                    "px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                    skillInput.trim()
                      ? "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Skills grid */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium group hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {skills.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No skills added yet. Start typing above to add your first skill.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <UserCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{activeTab}</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                This section is coming soon. For now, head to the <strong>Skills</strong> tab to set up your profile.
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-[320px] flex-shrink-0 space-y-6">
          {/* Profile Progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="relative flex-shrink-0">
                <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                  <circle cx="50" cy="50" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{progress}%</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Profile Progress</h3>
                <p className="text-xs text-gray-500 mt-1">Complete your profile to get better project recommendations</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Add your skills", bonus: "+30%", done: skills.length > 0 },
                { label: "Import your resume", bonus: "+40%", done: resumeSaved && resumeText.trim().length > 0 },
                { label: "Generate projects", bonus: "+30%", done: typeof window !== "undefined" && !!sessionStorage.getItem("skillsprint-analysis-result") },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {item.done ? (
                      <div className="w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={cn("text-sm", item.done ? "text-gray-400 line-through" : "text-gray-700")}>
                      {item.label}
                    </span>
                  </div>
                  <span className={cn("text-xs font-semibold", item.done ? "text-gray-400" : "text-[#4F46E5]")}>
                    {item.bonus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Import Resume */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2.5 mb-1">
              <Upload className="w-4 h-4 text-gray-500" />
              <h3 className="font-bold text-gray-900">Import Resume</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Paste your resume text below</p>

            <textarea
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setResumeSaved(false);
              }}
              placeholder="Paste your resume content here..."
              rows={6}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] resize-none bg-gray-50/50 transition-all mb-3"
            />

            <button
              onClick={saveResume}
              disabled={!resumeText.trim() || resumeSaved}
              className={cn(
                "w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                resumeSaved
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : resumeText.trim()
                  ? "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {resumeSaved ? (
                <><Check className="w-4 h-4" /> Resume Saved</>
              ) : (
                <><Save className="w-4 h-4" /> Save Resume</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
