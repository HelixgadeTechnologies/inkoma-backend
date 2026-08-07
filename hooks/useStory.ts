import { create } from 'zustand';
import { Story, StoryNode, StoryChoice } from '@/types';

interface StoryState {
  currentStory: Story | null;
  activeChapterIndex: number;
  currentNodeId: string | null;
  historyPath: string[]; // array of node IDs visited
  visitedNodesCount: number;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  readingTheme: 'parchment' | 'night' | 'sandstone';
  isPlayingAudio: boolean;
  
  // Actions
  setStory: (story: Story) => void;
  setChapterIndex: (index: number) => void;
  chooseBranch: (choice: StoryChoice) => void;
  goToPreviousNode: () => void;
  resetStoryProgress: () => void;
  setFontSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  setReadingTheme: (theme: 'parchment' | 'night' | 'sandstone') => void;
  toggleAudioNarration: () => void;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  currentStory: null,
  activeChapterIndex: 0,
  currentNodeId: null,
  historyPath: [],
  visitedNodesCount: 0,
  fontSize: 'md',
  readingTheme: 'night',
  isPlayingAudio: false,

  setStory: (story: Story) => {
    const firstChapter = story.chapters?.[0];
    const initialNodeId = firstChapter ? firstChapter.rootNodeId : null;

    set({
      currentStory: story,
      activeChapterIndex: 0,
      currentNodeId: initialNodeId,
      historyPath: initialNodeId ? [initialNodeId] : [],
      visitedNodesCount: 1,
    });
  },

  setChapterIndex: (index: number) => {
    const { currentStory } = get();
    if (!currentStory || !currentStory.chapters?.[index]) return;

    const chapter = currentStory.chapters[index];
    set({
      activeChapterIndex: index,
      currentNodeId: chapter.rootNodeId,
      historyPath: [chapter.rootNodeId],
      visitedNodesCount: 1,
    });
  },

  chooseBranch: (choice: StoryChoice) => {
    const { historyPath, visitedNodesCount } = get();
    set({
      currentNodeId: choice.targetNodeId,
      historyPath: [...historyPath, choice.targetNodeId],
      visitedNodesCount: visitedNodesCount + 1,
    });
  },

  goToPreviousNode: () => {
    const { historyPath } = get();
    if (historyPath.length <= 1) return;

    const newPath = [...historyPath];
    newPath.pop();
    const previousNodeId = newPath[newPath.length - 1];

    set({
      currentNodeId: previousNodeId,
      historyPath: newPath,
    });
  },

  resetStoryProgress: () => {
    const { currentStory, activeChapterIndex } = get();
    if (!currentStory) return;
    const chapter = currentStory.chapters?.[activeChapterIndex];
    const initialNodeId = chapter ? chapter.rootNodeId : null;

    set({
      currentNodeId: initialNodeId,
      historyPath: initialNodeId ? [initialNodeId] : [],
      visitedNodesCount: 1,
    });
  },

  setFontSize: (fontSize) => set({ fontSize }),
  setReadingTheme: (readingTheme) => set({ readingTheme }),
  toggleAudioNarration: () => set((state) => ({ isPlayingAudio: !state.isPlayingAudio })),
}));
