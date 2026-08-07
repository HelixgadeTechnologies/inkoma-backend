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
      {/* Griot Mic Indicator */}
      <div className="flex items-center gap-2 pr-2 border-r border-stone-200">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-800">
          <Mic className="h-3.5 w-3.5" />
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-[11px] font-bold text-amber-900 leading-none">
            {title ? title : "Griot Voice"}
          </span>
          <span className="text-[9px] text-stone-500 font-medium">Oral Narration</span>
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
          ambientAudio ? "text-amber-800 bg-amber-100" : "text-stone-500 hover:text-stone-900"
        }`}
        title="Night Fireplace Ambiance"
      >
        <Sparkles className="h-3.5 w-3.5 mr-1 text-amber-600" />
        <span className="text-[10px] hidden md:inline">
          {ambientAudio ? "Hearth Fire ON" : "Hearth FX"}
        </span>
      </Button>
    </div>
  );
}
