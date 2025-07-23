export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  tags: string[];
  categories: string[];
  featuredImage?: string;
  status: 'published' | 'draft' | 'scheduled';
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  commentsCount: number;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  isExternal?: boolean;
  originalUrl?: string;
  source?: string;
  sourceLogo?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  replies?: Comment[];
}

export interface Like {
  id: string;
  userId: string;
  postId?: string;
  commentId?: string;
  createdAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postsCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postsCount: number;
}