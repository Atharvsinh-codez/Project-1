"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "@/components/landing-page/navbar/navbar";
import Footer from "@/components/landing-page/footer/footer";
import { motion } from "motion/react";

interface ContactFormData {
  name: string;
  email: string;
  intent:
    | "Investment Inquiry"
    | "Creator Onboarding"
    | "Technical Partnership"
    | "General Support";
  message: string;
}

// Structured Founder Data
interface Founder {
  name: string;
  role: string;
  linkedin: string;
}

const founders: Founder[] = [
  {
    name: "Agnish",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/agnish-bhattacharya-324031286/",
  },
  {
    name: "Yash",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/yash-khurana-93006028b/",
  },
  {
    name: "Aditya",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/aditya-singh-3274101b4/",
  },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    intent: "Investment Inquiry",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipient = "draviyaofficial@gmail.com";
    const subject = encodeURIComponent(
      `${formData.intent} from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

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
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-[#FF2F00] mb-6 block font-bold">
              Direct Channels
            </span>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
              Let’s start a <br />
              <span className="italic font-serif text-zinc-400">
                new conversation.
              </span>
            </h1>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          {/* LEFT: Founder Access with LinkedIn Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-zinc-300"></span> The Founders
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {founders.map((founder) => (
                  <div
                    key={founder.name}
                    className="group border-b border-zinc-200 pb-4 flex justify-between items-end hover:border-[#FF2F00] transition-colors duration-300"
                  >
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">
                        {founder.name}
                      </p>
                      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                        {founder.role}
                      </p>
                    </div>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-zinc-300 uppercase tracking-[0.2em] hover:text-[#FF2F00] transition-colors flex items-center gap-2"
                    >
                      Connect <span className="text-xs">↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400 mb-4">
                Official Channels
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase mb-1">
                    General & Partnerships
                  </p>
                  <p className="text-xl font-medium underline underline-offset-4 decoration-zinc-300 hover:decoration-[#FF2F00] transition-all cursor-pointer">
                    draviyaofficial@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: The Paper Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-zinc-200 translate-x-2 translate-y-2 rounded-sm -z-10"></div>

            <div className="bg-white border border-zinc-200 p-10 md:p-14 shadow-sm rounded-sm">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full bg-transparent border-b border-zinc-200 py-2 focus:outline-none focus:border-[#FF2F00] transition-colors placeholder:text-zinc-200"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full bg-transparent border-b border-zinc-200 py-2 focus:outline-none focus:border-[#FF2F00] transition-colors placeholder:text-zinc-200"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="intent"
                    value={formData.intent}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-zinc-200 py-2 focus:outline-none focus:border-[#FF2F00] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Investment Inquiry">
                      Investment Inquiry
                    </option>
                    <option value="Creator Onboarding">
                      Creator Onboarding
                    </option>
                    <option value="Technical Partnership">
                      Technical Partnership
                    </option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="I'm interested in..."
                    className="w-full bg-transparent border-b border-zinc-200 py-2 focus:outline-none focus:border-[#FF2F00] transition-colors placeholder:text-zinc-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-zinc-900 text-white py-5 rounded-full font-bold hover:bg-[#FF2F00] transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-zinc-200 active:scale-[0.98]"
                >
                  Open Mail & Send
                </button>

                <p className="text-[10px] font-mono text-zinc-400 text-center leading-relaxed italic">
                  Clicking will open your default mail app with the text
                  pre-filled.
                </p>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Footer Statement */}
        <section className="max-w-7xl mx-auto px-6 border-t border-zinc-200 pt-20 text-center">
          <div className="font-serif italic text-3xl text-zinc-400 mb-4 max-w-2xl mx-auto leading-tight">
            "The best conversations happen where infrastructure meets ambition."
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-300">
            — DRAVIYA
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
