import Link from 'next/link';
import { ArrowRight, FileText, Search, Target, Lightbulb, ChevronRight, GitCompareArrows, Rocket, Sparkles } from 'lucide-react';

export default function Home() {
  const steps = [
    { icon: FileText, label: 'Build Profile', description: 'Add your skills & resume', color: 'bg-indigo-50 text-indigo-600' },
    { icon: Search, label: 'Set Target', description: 'Describe your dream role', color: 'bg-purple-50 text-purple-600' },
    { icon: Target, label: 'Find Gaps', description: 'AI-powered skill matching', color: 'bg-amber-50 text-amber-600' },
    { icon: Lightbulb, label: 'Build Projects', description: 'Close gaps with real work', color: 'bg-emerald-50 text-emerald-600' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Semantic Skill Analysis',
      description: 'We use sentence embeddings to match your skills against job requirements — not just keyword matching.',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: GitCompareArrows,
      title: 'Smart Gap Detection',
      description: '"AWS" ≈ "Amazon Web Services". "Container orchestration" ≈ "Kubernetes". Our AI understands equivalence.',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Rocket,
      title: 'Curated Project Library',
      description: '100+ real-world projects across Backend, Cloud, DevOps, AI/ML, and more — each designed to build job-ready skills.',
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full text-sm font-medium text-indigo-700 mb-8">
            <Sparkles className="w-4 h-4" />
            Powered by sentence-transformers
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 tracking-tight leading-[1.15]">
            Turn your skill gaps
            <br />
            <span className="text-[#4F46E5]">into projects.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Upload your resume, describe your target role, and get curated project recommendations that close the exact skills you&apos;re missing.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/profile"
              className="inline-flex items-center px-8 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-base font-medium shadow-lg shadow-indigo-200/60 hover:shadow-xl hover:shadow-indigo-200/80 transition-all"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-3.5 border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-base font-medium hover:bg-white transition-all"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Flow Visualization */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={step.label} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-3`}>
                  <step.icon className="w-6 h-6" />
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-300 absolute -right-6 top-4 hidden sm:block" />
                )}
              </div>
              <span className="text-sm font-semibold text-gray-900">{step.label}</span>
              <span className="text-xs text-gray-500 mt-1">{step.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl border border-gray-200 p-7 hover:shadow-md transition-all">
              <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <p className="text-center text-sm text-gray-400">
          Built for CS students who want to stand out. &copy; SkillSprint {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
