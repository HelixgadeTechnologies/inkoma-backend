'use client';

import * as React from "react";
import { StoryNode, StoryChoice } from "@/types";
import { GitBranch, Plus, Trash2, Sparkles, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function BranchNodeCreator({
  node,
  onChange,
}: {
  node: StoryNode;
  onChange: (updatedNode: StoryNode) => void;
}) {
  const addChoice = () => {
    const newChoice: StoryChoice = {
      id: `choice-${Date.now()}`,
      label: "New choice branch decision",
      targetNodeId: "",
      consequenceHint: "A new destiny unfolds...",
    };

    onChange({
      ...node,
      choices: [...node.choices, newChoice],
    });
  };

  const removeChoice = (index: number) => {
    const newChoices = [...node.choices];
    newChoices.splice(index, 1);
    onChange({
      ...node,
      choices: newChoices,
    });
  };

  const updateChoice = (index: number, field: keyof StoryChoice, val: string) => {
    const newChoices = [...node.choices];
    newChoices[index] = { ...newChoices[index], [field]: val };
    onChange({
      ...node,
      choices: newChoices,
    });
  };

  return (
    <div className="space-y-6">
      {/* Node Content Editor */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between text-stone-900">
            <span className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-folklore-amber" />
              Active Narrative Node
            </span>
            <span className="text-xs font-mono text-stone-500">ID: {node.id}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Node Scene Heading
            </label>
            <Input
              value={node.title}
              onChange={(e) => onChange({ ...node, title: e.target.value })}
              placeholder="e.g. The Spider Encounters the Leopard in the High Canopy"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Story Prose / Dialogue (Markdown supported)
            </label>
            <textarea
              rows={8}
              value={node.content}
              onChange={(e) => onChange({ ...node, content: e.target.value })}
              placeholder="Write the tale's unfolding narrative here..."
              className="w-full rounded-xl border border-stone-300 bg-stone-50/50 p-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-folklore-amber font-serif leading-relaxed"
            />
          </div>
        </CardContent>
      </Card>

      {/* Choice Branch Connectors */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-folklore-amber" />
            Branching Choices & Destinies ({node.choices.length})
          </h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addChoice}
            className="gap-1 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Decision Fork
          </Button>
        </div>

        {node.choices.map((choice, idx) => (
          <div
            key={choice.id}
            className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-3 transition-all hover:border-[#680C07]/30"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#680C07]/10 text-xs font-bold text-[#680C07]">
                {String.fromCharCode(65 + idx)}
              </span>
              <button
                type="button"
                onClick={() => removeChoice(idx)}
                className="text-stone-400 hover:text-red-500 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Choice Option Prompt</label>
                <Input
                  value={choice.label}
                  onChange={(e) => updateChoice(idx, 'label', e.target.value)}
                  placeholder="e.g. Offer the golden calabash to the elder..."
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Target Node Connection</label>
                <Input
                  value={choice.targetNodeId}
                  onChange={(e) => updateChoice(idx, 'targetNodeId', e.target.value)}
                  placeholder="Target Node ID (e.g. node-climb-baobab)"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Foreshadowing Hint</label>
              <Input
                value={choice.consequenceHint || ''}
                onChange={(e) => updateChoice(idx, 'consequenceHint', e.target.value)}
                placeholder="e.g. Tests your humility before the Sky God Nyame..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
