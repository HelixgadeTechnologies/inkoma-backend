import { Story, StoryNode, StoryChoice } from '@/types';

/**
 * Validates whether all choice references point to valid node IDs in the chapter/story graph.
 */
export function validateStoryGraph(nodes: Record<string, StoryNode>, rootNodeId: string): {
  isValid: boolean;
  unreachableNodeIds: string[];
  brokenChoiceTargets: { fromNodeId: string; targetNodeId: string }[];
} {
  const visited = new Set<string>();
  const brokenChoices: { fromNodeId: string; targetNodeId: string }[] = [];

  function traverse(nodeId: string) {
    if (visited.has(nodeId)) return;
    const node = nodes[nodeId];
    if (!node) return;

    visited.add(nodeId);

    for (const choice of node.choices) {
      if (!nodes[choice.targetNodeId]) {
        brokenChoices.push({
          fromNodeId: nodeId,
          targetNodeId: choice.targetNodeId,
        });
      } else {
        traverse(choice.targetNodeId);
      }
    }
  }

  traverse(rootNodeId);

  const allNodeIds = Object.keys(nodes);
  const unreachable = allNodeIds.filter((id) => !visited.has(id));

  return {
    isValid: brokenChoices.length === 0 && unreachable.length === 0,
    unreachableNodeIds: unreachable,
    brokenChoiceTargets: brokenChoices,
  };
}

/**
 * Calculates all possible unique ending paths for an interactive tale.
 */
export function countStoryEndings(nodes: Record<string, StoryNode>): number {
  return Object.values(nodes).filter((node) => node.isEnding || node.choices.length === 0).length;
}
