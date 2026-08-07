"use client";

import { useState } from "react";
import {
  HelpCircle,
  Mail,
  Send,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Check,
  ShieldCheck,
  Globe,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const FAQS = [
  {
    category: "General Folklore & Platform",
    question: "What is INKOMA's mission in African storytelling?",
    answer:
      "INKOMA is a digital folklore sanctuary designed to preserve centuries-old African oral traditions, mythological epics, and trickster wisdom through immersive reading, authentic oral voice narration, and interactive branching choices.",
  },
  {
    category: "Creator Support & Royalties",
    question: "How do creator patron donations and Paystack payouts work?",
    answer:
      "Storytellers can configure their direct Paystack payment link and African bank account details in Settings. 100% of tips and patron gifts made by readers go directly to the author without platform deductions.",
  },
  {
    category: "Writing & Interactive Graphs",
    question: "How do I author a branching interactive tale?",
    answer:
      "From your Writer Studio, create a new story and add chapters. Each chapter allows you to define choice prompts that link directly to branch nodes and custom moral endings.",
  },
  {
    category: "Copyright & Indigenous Lore",
    question: "How is traditional oral lore credited and protected?",
    answer:
      "Public domain oral tales (such as traditional Anansi fables) are attributed to their root tradition and ethnic elders. Original adaptations and newly penned manuscripts remain the copyright of their respective authors.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("General Question");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSubject("");
      setMessage("");
      setEmail("");
    }, 4000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#680C07]/10 border border-[#680C07]/20 text-[#680C07] text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#680C07]" />
          Hearth Fire Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-sm text-stone-600">
          Find answers to common questions about reading, authoring, and supporting African storytellers.
        </p>
      </div>

      {/* Grid: FAQs + Ticket Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: FAQs Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#680C07]" /> Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-stone-900 font-bold text-sm"
                  >
                    <span className="font-serif">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-[#680C07]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-200">
                      <span className="text-[10px] uppercase font-bold text-[#680C07] block mb-1">
                        {faq.category}
                      </span>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Channels */}
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Direct Community Channels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-stone-200">
                <Mail className="w-4 h-4 text-[#680C07]" />
                <span>support@inkoma.org</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-stone-200">
                <MessageSquare className="w-4 h-4 text-[#680C07]" />
                <span>Discord Storyteller Circle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-stone-900 font-serif flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#680C07]" /> Send an Inquiry
            </h2>
            <p className="text-xs text-stone-500">
              Our archivist team typically responds within 24 hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <h3 className="text-sm font-bold text-emerald-900">Message Received!</h3>
              <p className="text-xs text-emerald-700">
                May the elders guide your path. We have received your inquiry and will follow up shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Your Email
                </label>
                <Input
                  type="email"
                  placeholder="author@inkoma.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-stone-300 text-stone-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Category
                </label>
                <Select
                  value={category}
                  onChange={(val) => setCategory(val)}
                  options={[
                    "General Question",
                    "Author & Royalties Support",
                    "Audio Narration Feedback",
                    "Report Content Violation",
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Question regarding Dogon cosmology branches"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="bg-white border-stone-300 text-stone-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your question in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#680C07]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#680C07] hover:bg-[#520905] text-white font-bold py-5 text-xs rounded-xl shadow-xs"
              >
                <Send className="w-3.5 h-3.5 mr-2" /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
