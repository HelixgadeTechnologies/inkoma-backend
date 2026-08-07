---
name: story-graph-architect
description: Guides creation and validation of multi-branch interactive narrative choice graphs for the Inkoma folklore platform.
---

# Story Graph Architect Skill

This skill assists Griots and authors in structuring interactive folklore stories in Inkoma.

## Narrative Node Schema

Every interactive node in Inkoma must define:
1. `id`: A unique kebab-case identifier (e.g., `node-anansi-climb-tree`).
2. `title`: The chapter scene heading.
3. `content`: The story prose or dialogue.
4. `choices`: Array of `StoryChoice` objects referencing `targetNodeId`.
5. `isEnding` & `moralLesson`: For terminal narrative nodes.

## Rules for Branch Integrity

- No orphan nodes: Every node must be reachable from the chapter's `rootNodeId`.
- Balanced consequences: Provide at least two distinct moral or tactical choices at each juncture.
- Cultural authenticity: Anchor motifs to the specified African tradition (Akan, Yoruba, Zulu, Dogon, etc.).
