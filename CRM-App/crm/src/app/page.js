"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Ticket,
} from "lucide-react";

export default function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Ticket className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              CRM Pro
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">
              Workflow
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
              v2.0 is now live with real-time tracking
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8">
              Empower your support <br />
              <span className="text-blue-600">with CRM Pro.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              The centralized hub where <b>Customers</b> find answers,
              <b> Engineers</b> solve complex issues, and <b>Admins</b> maintain
              total control.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="group bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
              >
                Launch Dashboard{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {/**Arrow Right is the inbuilt component used from lucide-react */}
              </Link>
              <Link
                href="/login"
                className="bg-white border border-slate-200 text-slate-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition shadow-sm"
              >
                View Live Demo
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-60 pointer-events-none">
          <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400 rounded-full blur-[130px]" />
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-white border-y border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Everything you need to scale support
            </h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "Role-Based Intelligence",
                desc: "Separate interfaces for Customers, Engineers, and Admins tailored to their specific needs.",
              },
              {
                icon: <Zap className="w-8 h-8 text-amber-500" />,
                title: "Instant Escalation",
                desc: "Seamlessly transition tickets from creation to assignment to resolution without delays.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
                title: "Admin Oversight",
                desc: "Full control over user approval and system status. Keep your support environment secure.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition group"
              >
                <div className="mb-4 p-3 bg-white w-fit rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow / How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">
          The CRM Pro Lifecycle
        </h2>
        <div className="space-y-12">
          {[
            {
              step: "01",
              user: "Customer",
              action:
                "Raise a ticket with priority levels and detailed descriptions.",
              icon: <MessageSquare />,
            },
            {
              step: "02",
              user: "Admin",
              action:
                "Approve engineers and monitor global ticket distribution.",
              icon: <ShieldCheck />,
            },
            {
              step: "03",
              user: "Engineer",
              action:
                "Pick up assigned tickets and update status in real-time.",
              icon: <CheckCircle />,
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-8 items-start">
              <div className="text-4xl font-black text-slate-200 italic">
                {item.step}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex-grow">
                <div className="flex items-center gap-2 mb-2 font-bold text-blue-600">
                  {item.user}{" "}<span className='text-slate-500'>{item.icon}</span>
                </div>
                <p className="text-slate-600 font-medium">{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white mx-6 rounded-[2rem] mb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Ready to streamline your workflow?
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Join CRM Pro to get world-class support.
          </p>
          <Link
            href="/signup"
            className="bg-white text-slate-900 px-12 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition shadow-xl"
          >
            Get Started for Free
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </section>

      <footer className="py-12 text-center text-slate-500 text-sm border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <Ticket className="w-4 h-4" /> CRM Pro
          </div>
          <div>© 2026 CRM Pro. All rights reserved. Built for efficiency.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
