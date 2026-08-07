'use client';

import * as React from "react";
import { Volume2, VolumeX, Play, Pause, FastForward, Sparkles, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/useSpeech";

export function AudioPlayer({
  textToRead = "Welcome to Inkoma oral storytelling.",
  title,
}: {
  textToRead?: string;
  title?: string;
}) {
  const { isSpeaking, isSupported, rate, setRate, speak, stop } = useSpeech();
  const [ambientAudio, setAmbientAudio] = React.useState(false);

  const toggleNarration = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(textToRead);
    }
  };

  const cycleRate = () => {
    if (rate === 1) setRate(1.25);
    else if (rate === 1.25) setRate(0.85);
    else setRate(1);
  };

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-md text-stone-900">
      {/* Oral Voice Indicator */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-[#680C07] text-white shadow-xs shrink-0">
          <Volume2 className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-stone-900 truncate font-serif">
            {title ? title : "Oral Voice"}
          </p>
          <p className="text-[10px] text-stone-500 truncate">
            Traditional Narration
          </p>
        </div>
      </div>

      {/* Play/Pause Button */}
      <Button
        type="button"
        size="sm"
        onClick={toggleNarration}
        className="bg-[#680C07] hover:bg-[#520905] text-white rounded-xl gap-1.5 text-xs font-semibold shadow-xs shrink-0 px-3 py-1.5"
        disabled={!isSupported}
      >
        {isSpeaking ? (
          <>
            <Pause className="w-3.5 h-3.5 fill-white" />
            <span>Pause Narration</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Listen</span>
          </>
        )}
      </Button>

      {/* Speed Rate Control */}
      <Button
        variant="outline"
        size="sm"
        onClick={cycleRate}
        className="text-[11px] h-8 px-2.5 rounded-lg border-stone-300 font-mono text-stone-700 hover:bg-stone-100"
      >
        {rate}x
      </Button>

      {/* Ambient Forest / Fire FX Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setAmbientAudio(!ambientAudio)}
        className={`h-8 px-2 rounded-lg text-xs ${
          ambientAudio ? "text-[#680C07] bg-[#680C07]/10 border border-[#680C07]/20" : "text-stone-500 hover:text-stone-900"
        }`}
        title="Night Fireplace Ambiance"
      >
        <Sparkles className="h-3.5 w-3.5 mr-1 text-[#680C07]" />
        <span className="text-[10px] hidden md:inline">
          {ambientAudio ? "Hearth Fire ON" : "Hearth FX"}
        </span>
      </Button>
    </div>
  );
}
