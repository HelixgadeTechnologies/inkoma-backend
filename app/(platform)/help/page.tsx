"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Mail,
  Send,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Check,
  Search,
  BookOpen,
  Users,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

// Social Media Icons
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.34 1.54-1.35 2.55-.07 1.25.68 2.48 1.79 2.99 1.09.52 2.45.36 3.39-.41.77-.61 1.22-1.57 1.24-2.55.03-4.66.01-9.33.02-13.99z" />
    </svg>
  );
}

const FAQS = [
  {
    category: "General & Reading",
    question: "What is INKOMA's mission in African storytelling?",
    answer:
      "INKOMA is a digital folklore sanctuary designed to preserve centuries-old African oral traditions, mythological epics, and trickster wisdom through immersive reading, authentic oral voice narration, and interactive branching choices.",
  },
  {
    category: "Writing & Studio",
    question: "How do I author a branching interactive tale?",
    answer:
      "From your Writer Studio, create a new story and add chapters. Each chapter allows you to define choice prompts that link directly to branch nodes and custom moral endings.",
  },
  {
    category: "Audio & Oral Voices",
    question: "How does oral audio narration work?",
    answer:
      "Stories with elder narration badges feature authentic voice recordings in indigenous dialects (such as Yoruba, Swahili, Zulu, and Twi). You can listen to full chapter narrations directly inside the story reader.",
  },
  {
    category: "Copyright & Lore Protection",
    question: "How is traditional oral lore credited and protected?",
    answer:
      "Public domain oral tales (such as traditional Anansi fables) are attributed to their root tradition and ethnic elders. Original adaptations and newly penned manuscripts remain the copyright of their respective authors.",
  },
  {
    category: "Account & Settings",
    question: "How can I update my profile or writer bio?",
    answer:
      "Navigate to Settings in your user menu to edit your display name, bio, social media profiles, and payout details.",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("General Inquiry");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="space-y-12 pb-16 max-w-6xl mx-auto">
      {/* Header & Search */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8860B] text-xs font-extrabold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#B8860B]" />
          INKOMA Help Center &amp; Support
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
          How Can We Assist You Today?
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
          Explore answers to frequently asked questions, join our vibrant community channels, or get in touch directly with our archivist team.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <Input
            type="text"
            placeholder="Search FAQs, topics, writing guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-6 text-sm bg-white border-stone-300 rounded-2xl shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37]"
          />
        </div>
      </div>

      {/* 1. COMMUNITY & ASSISTANCE CHANNELS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:border-[#D4AF37]/60 transition-all space-y-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 w-fit border border-purple-200">
            <DiscordIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">Discord Community</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Join 5,000+ writers and readers in our active Discord server for daily discussions and feedback.
          </p>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8860B] hover:text-[#9A7B0C] transition-colors pt-1"
          >
            <span>Join Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:border-[#D4AF37]/60 transition-all space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 w-fit border border-emerald-200">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">WhatsApp Lore Circle</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Get instant announcements, weekly story spotlights, and direct community updates.
          </p>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8860B] hover:text-[#9A7B0C] transition-colors pt-1"
          >
            <span>Join WhatsApp Group</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:border-[#D4AF37]/60 transition-all space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-[#B8860B] w-fit border border-[#D4AF37]/30">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">Direct Email Support</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Email our archivist support team directly at <span className="font-semibold text-stone-800">support@inkoma.com</span>
          </p>
          <a
            href="mailto:support@inkoma.com"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8860B] hover:text-[#9A7B0C] transition-colors pt-1"
          >
            <span>Send Email</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:border-[#D4AF37]/60 transition-all space-y-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 w-fit border border-blue-200">
            <TiktokIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">TikTok &amp; Social Lore</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Follow our short-form folklore video clips, author spotlights, and oral storytelling snippets.
          </p>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8860B] hover:text-[#9A7B0C] transition-colors pt-1"
          >
            <span>Follow on TikTok</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. FAQS & CONTACT FORM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: FAQs Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B8860B]" />
              Frequently Asked Questions
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              {filteredFaqs.length} articles found
            </span>
          </div>

          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs transition-all hover:border-[#D4AF37]/50"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4.5 text-left flex items-center justify-between gap-3 text-stone-900 font-bold text-sm"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#B8860B]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4.5 pb-4.5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FAF8F5]/60 animate-in fade-in duration-200">
                        <span className="text-[10px] uppercase font-black text-[#B8860B] tracking-wider block mb-1">
                          {faq.category}
                        </span>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 bg-stone-50 rounded-2xl text-center text-stone-500 text-sm">
                No matching questions found for "{searchQuery}". Please send us a message below!
              </div>
            )}
          </div>

          {/* Social Media Links Box */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#B8860B]" />
              Official Social Media &amp; Community Channels
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:border-[#D4AF37] hover:bg-white text-stone-700 text-xs font-semibold transition-all"
              >
                <TiktokIcon className="w-4 h-4 text-stone-900" />
                <span>TikTok</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:border-[#D4AF37] hover:bg-white text-stone-700 text-xs font-semibold transition-all"
              >
                <TwitterIcon className="w-4 h-4 text-stone-900" />
                <span>Twitter / X</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:border-[#D4AF37] hover:bg-white text-stone-700 text-xs font-semibold transition-all"
              >
                <InstagramIcon className="w-4 h-4 text-stone-900" />
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:border-[#D4AF37] hover:bg-white text-stone-700 text-xs font-semibold transition-all"
              >
                <YoutubeIcon className="w-4 h-4 text-stone-900" />
                <span>YouTube</span>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:border-[#D4AF37] hover:bg-white text-stone-700 text-xs font-semibold transition-all"
              >
                <DiscordIcon className="w-4 h-4 text-stone-900" />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Integrated Contact Inquiry Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              &lt; 24 Hour Response Guarantee
            </div>
            <h2 className="text-xl font-bold text-stone-950 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#B8860B]" /> Contact Support Team
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Have a specific question or issue? Fill out the inquiry form below and our team will get back to you promptly.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <h3 className="text-sm font-bold text-emerald-900">Inquiry Received!</h3>
              <p className="text-xs text-emerald-700">
                Thank you for reaching out to INKOMA. We have logged your request and will follow up at <span className="font-bold">{email}</span> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                  Your Email Address
                </label>
                <Input
                  type="email"
                  placeholder="reader@inkoma.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-stone-300 text-stone-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider block">
                  Inquiry Category
                </label>
                <Select
                  value={category}
                  onChange={(val) => setCategory(val)}
                  options={[
                    "General Inquiry",
                    "Reading & App Troubleshooting",
                    "Author Studio & Publishing",
                    "Audio Narration Feedback",
                    "Report Content Violation",
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Inquiry regarding audio chapter downloads"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="bg-white border-stone-300 text-stone-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your inquiry in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#c49f27] text-stone-950 font-bold py-5 text-xs rounded-xl shadow-md"
              >
                <Send className="w-3.5 h-3.5 mr-2" /> Send Inquiry Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
