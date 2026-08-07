'use client';

import * as React from "react";
import { Volume2, VolumeX, Play, Pause, FastForward, Sparkles, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/useSpeech";

export function AudioPlayer({ textToRead }: { textToRead: string }) {
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
    <div className="flex items-center gap-2 rounded-2xl border border-folklore-amber/30 bg-folklore-night/90 px-4 py-2.5 backdrop-blur-md shadow-lg text-white">
      {/* Griot Mic Indicator */}
      <div className="flex items-center gap-2 pr-2 border-r border-white/10">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-folklore-terracotta/20 text-folklore-terracotta">
          <Mic className="h-3.5 w-3.5" />
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-[11px] font-semibold text-folklore-gold leading-none">
            Griot Voice
          </span>
          <span className="text-[9px] text-neutral-400">Oral Narration</span>
        </div>
      </div>

      {/* Main Play/Pause Button */}
      <Button
        variant="folklore"
        size="sm"
        onClick={toggleNarration}
        className="gap-1.5 h-8 px-3 rounded-lg text-xs"
        disabled={!isSupported}
      >
        {isSpeaking ? (
          <>
            <Pause className="h-3.5 w-3.5" />
            <span>Pause Griot</span>
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Listen Oral Tale</span>
          </>
        )}
      </Button>

      {/* Speed Multiplier */}
      <Button
        variant="ghost"
        size="sm"
        onClick={cycleRate}
        className="h-8 px-2 text-xs text-neutral-300 hover:text-folklore-gold"
      >
        {rate}x
      </Button>

      {/* Ambient Drums Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setAmbientAudio(!ambientAudio)}
        className="h-8 px-2 text-xs gap-1 text-neutral-300 hover:text-folklore-amber"
        title="Ambient Kalimba & Djembe Background"
      >
        <Sparkles className="h-3.5 w-3.5 text-folklore-amber" />
        <span className="hidden md:inline text-[11px]">
          {ambientAudio ? "Drums On" : "Ambient"}
        </span>
      </Button>
    </div>
  );
}
