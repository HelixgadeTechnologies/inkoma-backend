'use client';

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, GitBranch, Play, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BranchNodeCreator } from "@/components/features/editor/branch-node-creator";
import { CharacterTree } from "@/components/features/editor/character-tree";
import { TRADITIONS } from "@/config/genres";
import { StoryNode } from "@/types";

export default function StudioNewStoryPage() {
  const [title, setTitle] = React.useState("The Legend of the Golden Stool (Sika Dwa Kofi)");
  const [tradition, setTradition] = React.useState("Ashanti/Akan");
  const [saved, setSaved] = React.useState(false);
  const [generatingAI, setGeneratingAI] = React.useState(false);

  // Active root node for editing
  const [currentNode, setCurrentNode] = React.useState<StoryNode>({
    id: "node-root",
    title: "The Descent from the Clouds of Asase Yaa",
    content: `High priest Okomfo Anokye struck his golden staff upon the sacred soil of Kumasi. A fierce storm gathered overhead as the clouds parted to reveal a solid gold stool descending from the heavens.

The gathering chiefs watched in awe as the artifact came to rest gently on the lap of King Osei Tutu I.`,
    choices: [
      {
        id: "choice-1",
        label: "Proclaim the stool as the sacred soul (Sunsum) of the entire Ashanti nation",
        targetNodeId: "node-sunsum-unite",
        consequenceHint: "Unites the seven royal clans under one unified destiny...",
      },
      {
        id: "choice-2",
        label: "Bury the golden swords around the tree to seal an eternal pact",
        targetNodeId: "node-swords-covenant",
        consequenceHint: "Tests the loyalty of the paramount chiefs...",
      },
    ],
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleGenerateAIBranch = () => {
    setGeneratingAI(true);
    setTimeout(() => {
      setGeneratingAI(false);
      setCurrentNode((prev) => ({
        ...prev,
        choices: [
          ...prev.choices,
          {
            id: `choice-ai-${Date.now()}`,
            label: "Consult the Oracle of the Sacred Forest before taking the oath",
            targetNodeId: "node-oracle-counsel",
            consequenceHint: "Wisdom of the ancient spirits prevents future conflict...",
          },
        ],
      }));
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <Link
          href="/studio"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-folklore-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Studio</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleGenerateAIBranch}
            disabled={generatingAI}
            className="gap-1.5 text-xs border-folklore-amber/30 text-folklore-gold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{generatingAI ? "Weaving Branch..." : "AI Branch Suggestion"}</span>
          </Button>

          <Button
            type="button"
            variant="folklore"
            size="sm"
            onClick={handleSave}
            className="gap-1.5 text-xs"
          >
            {saved ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Saved to Archive</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>Save Manuscript</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Story Metadata Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl border border-folklore-amber/20 bg-folklore-obsidian">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-neutral-300 block mb-1">
            Story Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of your folklore masterpiece..."
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-neutral-300 block mb-1">
            Tradition Heritage
          </label>
          <select
            value={tradition}
            onChange={(e) => setTradition(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-folklore-night/80 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-folklore-amber"
          >
            {TRADITIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Studio Workspace Tabs */}
      <Tabs defaultValue="nodes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nodes" className="gap-1.5">
            <GitBranch className="h-4 w-4" />
            <span>Node Branch Editor</span>
          </TabsTrigger>
          <TabsTrigger value="characters" className="gap-1.5">
            <span>Character Lore Tree</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-1.5">
            <Eye className="h-4 w-4" />
            <span>Reader Simulation</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Node Branch Editor */}
        <TabsContent value="nodes" className="space-y-4 mt-6">
          <BranchNodeCreator node={currentNode} onChange={(updated) => setCurrentNode(updated)} />
        </TabsContent>

        {/* Tab 2: Character Lore Tree */}
        <TabsContent value="characters" className="space-y-4 mt-6">
          <CharacterTree />
        </TabsContent>

        {/* Tab 3: Reader Simulation Preview */}
        <TabsContent value="preview" className="mt-6">
          <div className="rounded-3xl border border-folklore-amber/30 bg-folklore-night p-8 space-y-6 text-white max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <Badge variant="gold">{tradition}</Badge>
              <span className="text-xs text-neutral-400">Simulation View</span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-folklore-gold">{currentNode.title}</h2>
            <p className="font-serif text-lg leading-relaxed whitespace-pre-line text-neutral-200">
              {currentNode.content}
            </p>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-folklore-amber block">
                Interactive Decisions ({currentNode.choices.length})
              </span>
              <div className="grid grid-cols-1 gap-3">
                {currentNode.choices.map((c, i) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl border border-folklore-amber/30 bg-folklore-obsidian flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-serif font-bold text-white">{c.label}</p>
                      {c.consequenceHint && (
                        <p className="text-xs text-neutral-400 italic mt-0.5">{c.consequenceHint}</p>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {c.targetNodeId || "Unconnected"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
