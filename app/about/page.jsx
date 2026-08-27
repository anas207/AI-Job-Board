import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Globe,
  ShieldCheck,
  Zap,
  Users,
  Target,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Building2
} from 'lucide-react';

export const metadata = {
  title: 'About Us | AI Job Board',
  description: 'Learn about AI Job Board - The premier platform connecting global AI talent with top remote Artificial Intelligence, Machine Learning, and Data Science roles.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Remote AI Jobs Listed', value: '100+' },
    { label: 'Countries Supported', value: '85+' },
    { label: 'Active Employers', value: '20+' },
    { label: 'Talent Match Rate', value: '98%' },
  ];

  const values = [
    {
      icon: Sparkles,
      title: 'AI-Focused Curation',
      description: 'We filter out the noise. Every job on our platform is hand-vetted for pure AI, ML, NLP, LLM, and Data Science relevance.'
    },
    {
      icon: Globe,
      title: 'Global Remote Access',
      description: 'Break geographical boundaries. We connect talent with remote-first opportunities regardless of timezone or physical location.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Employers',
      description: 'Direct relationships with reputable AI startups, enterprise research labs, and tech innovators actively hiring.'
    },
    {
      icon: Zap,
      title: 'Direct Application Process',
      description: 'No middleman delays. Apply directly through company portals or verified recruiter contact channels instantly.'
    },
    {
      icon: Target,
      title: 'Precision Career Matching',
      description: 'Tailored for specialized skill sets—from PyTorch research engineering to production MLOps deployment.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Empowering a global network of AI practitioners, data scientists, and visionary engineering leaders.'
    }
  ];

  const features = [
    'Hand-verified remote AI and Machine Learning job listings',
    'Coverage across LLMs, Computer Vision, Robotics, NLP, and Data Engineering',
    'Seamless connection between global candidates and top hiring teams',
    'Free access for job seekers with real-time updates'
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-orange-100/50 ">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.orange.50),transparent)] opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100/80 rounded-full mb-6 border border-orange-200">
            <BrainCircuit className="w-4 h-4" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-gray-900 tracking-tight mb-6">
            Connecting World-Class Talent <br className="hidden md:inline" />
            With Next-Gen AI Roles
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI Job Board was created to empower engineers, researchers, and data leaders to find high-impact, 100% remote artificial intelligence careers with companies defining the future.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-orange-50/40 border border-orange-200 hover:border-orange-300 transition-all duration-200 "
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-1 text-orange-600">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Vision Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-top">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100/80 rounded-full mb-4">
              <span>Why We Exist</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-6">
              Built specifically for the rapidly evolving Artificial Intelligence landscape.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Traditional job boards are flooded with generic software engineering posts that bury real AI opportunities. We established AI Job Board to create a dedicated, high-signal destination solely focused on remote AI, Machine Learning, Deep Learning, and Data Science careers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Whether you are an AI Research Scientist specializing in transformer architectures, an MLOps Engineer scaling inference infrastructure, or a Product Leader driving generative AI tools, our platform is built for you.
            </p>

            <div className="space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                  <Building2 className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-gray-100">For Hiring Teams & Employers</h3>
                  <p className="text-xs text-gray-400">Hire Top 1% Global AI Talent</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Finding qualified AI professionals shouldn't mean sifting through hundreds of irrelevant resumes. Post your remote job on AI Job Board and connect directly with vetted candidates eager to shape the future of your AI products.
              </p>

              <Link
                href="/employer/post-job"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Post an AI Job Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600">
              Our core principles focus on quality, speed, and genuine value for candidates and hiring teams alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100/70 text-orange-600 flex items-center justify-center mb-6 ">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
          Ready to Find Your Next Remote AI Role?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Explore hundreds of active job listings in artificial intelligence, machine learning, NLP, and data engineering.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary"
          >
            Browse All Jobs
          </Link>
          <Link
            href="/employer/post-job"
            className="btn-secondary"
          >
            Post a Remote Job
          </Link>
        </div>
      </section>
    </div>
  );
}
