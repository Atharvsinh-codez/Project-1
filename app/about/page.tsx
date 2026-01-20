"use client";
import React from "react";
import Navbar from "@/components/landing-page/navbar/navbar";
import Footer from "@/components/landing-page/footer/footer";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9EFE3] text-zinc-900 pt-32 pb-20 selection:bg-[#FF2F00] selection:text-white">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-[#FF2F00] mb-6 block">
              The Evolution of Value
            </span>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
              Building the <br />
              <span className="italic font-serif text-zinc-400">
                Creator Asset Layer.
              </span>
            </h1>
          </motion.div>
        </section>

        {/* The Split Story Section */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-40">
          {/* LEFT: The Letter (Aesthetic Focus) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Subtle offset background for a 'stacked paper' look */}
            <div className="absolute inset-0 bg-zinc-200 translate-x-2 translate-y-2 rounded-sm -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>

            <div className="bg-white border border-zinc-200 p-10 md:p-14 shadow-sm rounded-sm">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    A Note From
                  </p>
                  <h3 className="font-serif italic text-2xl text-zinc-800">
                    The Co-founders
                  </h3>
                </div>
                <div className="text-right font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                  Ref: DRA-2025
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-zinc-700 font-light">
                <p>
                  Before we were founders, we were just students—
                  <span className="text-zinc-900 font-medium">
                    Agnish, Yash, and Aditya
                  </span>
                  —who grew up watching our favorite creators build worlds from
                  nothing.
                </p>
                <p>
                  During the lockdown, creators weren’t just entertainment; they
                  became our educators and companions. But as life got busy
                  again, supporting them started to feel like a "guilty
                  pleasure."
                </p>
                <p className="italic font-serif text-xl text-zinc-900 border-l-2 border-[#FF2F00] pl-6 py-2 my-8">
                  "Why does supporting a creator’s growth feel like wasted time,
                  when we believe in their future as much as any startup?"
                </p>
                <p>
                  Fans invest massive emotional capital with no financial
                  bridge. Creators rely on unpredictable ads. We built{" "}
                  <span className="text-[#FF2F00] font-medium">Project-1</span> to
                  turn that emotional belief into a structured, transparent
                  asset class.
                </p>
              </div>

              <div className="mt-14 pt-10 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex gap-4">
                  {["Agnish", "Yash", "Aditya"].map((name) => (
                    <div key={name} className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase text-[#FF2F00]">
                        {name}
                      </span>
                      <span className="text-[9px] text-zinc-400 uppercase tracking-tighter italic">
                        Co-founder
                      </span>
                    </div>
                  ))}
                </div>
                <div className="font-serif italic text-zinc-400 text-sm">
                  Onwards.
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Our Mission (Clean & Bold) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pt-10"
          >
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-zinc-300"></span> Our Mission
            </h2>

            <div className="space-y-16">
              <div className="group">
                <h4 className="text-3xl font-semibold mb-4 tracking-tight group-hover:text-[#FF2F00] transition-colors duration-300">
                  Aligning Incentives.
                </h4>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                  We believe fans should be more than viewers. Our mission is to
                  transform the creator-fan relationship from passive
                  consumption into active, financial participation.
                </p>
              </div>

              <div className="group border-l-2 border-zinc-200 pl-8 hover:border-[#FF2F00] transition-colors duration-500">
                <h4 className="text-3xl font-semibold mb-4 tracking-tight">
                  Transparent Growth.
                </h4>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                  Moving away from opaque algorithms. We use on-chain bonding
                  curves to ensure that value is created and distributed through
                  mathematical fairness, not platform whims.
                </p>
              </div>

              <div className="group">
                <h4 className="text-3xl font-semibold mb-4 tracking-tight group-hover:text-[#FF2F00] transition-colors duration-300">
                  The Sovereign Creator.
                </h4>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                  Our goal is to give creators the tools to own their equity,
                  allowing them to focus on what they do best while their
                  community powers their expansion.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Final Statement / CTA */}
        <section className="max-w-5xl mx-auto px-6 text-center py-24 bg-zinc-900 rounded-[4rem] text-[#F9EFE3] relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2F00] blur-[120px] opacity-10 pointer-events-none"></div>

          <h2 className="text-5xl md:text-7xl font-medium mb-8 tracking-tighter">
            Build the Future <br /> of Creator Finance.
          </h2>
          <p className="text-zinc-400 mb-12 text-lg max-w-xl mx-auto">
            Join the waitlist to be among the first to explore the new asset
            layer for the creator economy.
          </p>
          <a
            href="/#waitlist-email-input"
            className="text-sm sm:text-base lg:text-lg xl:text-xl border border-zinc-900 bg-linear-to-t from-[#FF2F00] to-[#f5775b] cursor-pointer hover:from-[#FF2F00] hover:to-[#FF2F00] font-semibold text-white px-4 sm:px-5 lg:px-6 xl:px-7 py-2 sm:py-2.5 lg:py-3 rounded-full transition-all duration-300 relative z-50 inline-block"
          >
            Join Waitlist
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
