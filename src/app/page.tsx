import Link from 'next/link';
import { ArrowRight, FileText, Search, Target, Lightbulb, ChevronRight, GitCompareArrows, Rocket } from 'lucide-react';

export default function Home() {
  const steps = [
    { icon: FileText, label: 'Resume', color: 'bg-blue-50 text-blue-600' },
    { icon: Search, label: 'Skill Analysis', color: 'bg-purple-50 text-purple-600' },
    { icon: Target, label: 'Skill Gaps', color: 'bg-amber-50 text-amber-600' },
    { icon: Lightbulb, label: 'Projects', color: 'bg-emerald-50 text-emerald-600' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Analyze your skills',
      description: 'We extract skills from your resume and identify your current strengths.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: GitCompareArrows,
      title: 'Compare with job requirements',
      description: "See how your skills stack up against real job postings you're interested in.",
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Rocket,
      title: 'Get project recommendations',
      description: 'Receive curated project ideas designed to close your specific skill gaps.',
      color: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            Turn your skill gaps
            <br />
            <span className="text-emerald-600">into projects.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your resume, add the jobs you&apos;re targeting, and get project ideas designed to close the skills you&apos;re missing.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="inline-flex items-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-base font-medium shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-200 transition-all"
            >
              Find My Skill Gaps <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-3.5 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-full text-base font-medium hover:bg-gray-50 transition-all"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Flow Visualization */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-2">
              <div className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-gray-300 hidden sm:block mt-[-1.5rem]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl border border-gray-100 p-8 text-center hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <p className="text-center text-sm text-gray-400">
          Built for CS students who want to stand out.
        </p>
      </footer>
    </div>
  );
}
