"use client";

import * as React from "react";
import Image from "next/image";
import { Image as ImageIcon, Upload, Check, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

export const FOLKLORE_COVER_PRESETS = [
  {
    id: "preset-1",
    title: "Campfire Narration",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    tag: "Oral Tradition",
  },
  {
    id: "preset-2",
    title: "Golden Kingdom",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    tag: "Ashanti / Akan",
  },
  {
    id: "preset-3",
    title: "Ancient Savannah",
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    tag: "Zulu / Maasai",
  },
  {
    id: "preset-4",
    title: "Sacred Rainforest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    tag: "Yoruba Spirit",
  },
  {
    id: "preset-5",
    title: "Celestial Oracle",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    tag: "Cosmology",
  },
  {
    id: "preset-6",
    title: "Mystic River",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    tag: "Mami Wata",
  },
];

interface StoryCoverPickerProps {
  value: string;
  onChange: (url: string) => void;
}

export function StoryCoverPicker({ value, onChange }: StoryCoverPickerProps) {
  const [customInput, setCustomInput] = React.useState(value || "");

  const handleCustomChange = (url: string) => {
    setCustomInput(url);
    onChange(url);
  };

  return (
    <div className="space-y-4 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#680C07]/10 border border-[#680C07]/20 text-[#680C07] flex items-center justify-center">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-serif">Story Cover Artwork</h3>
            <p className="text-xs text-stone-500">Select a curated folklore cover preset or paste a custom URL</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {/* Cover Preview Card */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm flex flex-col justify-end p-4 group">
          {value ? (
            <Image src={value} alt="Story cover preview" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-4 text-center">
              <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
              <span className="text-xs font-semibold">No Cover Selected</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="relative z-10 text-white space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-200">
              Live Preview
            </span>
            <p className="text-xs font-bold font-serif line-clamp-1">Cover Thumbnail</p>
          </div>
        </div>

        {/* Preset Gallery & Custom Input */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5 uppercase tracking-wider">
              Curated African Artwork Presets
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {FOLKLORE_COVER_PRESETS.map((preset) => {
                const isSelected = value === preset.url;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setCustomInput(preset.url);
                      onChange(preset.url);
                    }}
                    className={`relative h-24 rounded-xl overflow-hidden border text-left transition-all group ${
                      isSelected
                        ? "border-[#680C07] ring-2 ring-[#680C07] shadow-sm"
                        : "border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <Image
                      src={preset.url}
                      alt={preset.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#680C07] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    <div className="absolute bottom-1.5 left-2 right-2 text-white">
                      <p className="text-[11px] font-bold truncate leading-tight">{preset.title}</p>
                      <span className="text-[9px] text-stone-300 font-medium">{preset.tag}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Or Custom Cover Image URL
            </label>
            <div className="relative">
              <Input
                type="url"
                value={customInput}
                onChange={(e) => handleCustomChange(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="bg-white border-stone-200 text-xs pr-8"
              />
              <Upload className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[10px] text-stone-400">
              Provide a direct link to any high-res image (Unsplash, Cloudinary, or web URL)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
