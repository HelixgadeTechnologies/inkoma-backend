export interface StoryComment {
  id: string;
  storyId: string;
  nodeId?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  upvotesCount: number;
  hasUpvoted?: boolean;
  createdAt: string;
  replies?: StoryComment[];
}

export interface CommunityDiscussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  traditionCategory: string;
  tags: string[];
  repliesCount: number;
  upvotesCount: number;
  createdAt: string;
  isPinned?: boolean;
}
