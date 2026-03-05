export interface BlogAuthor {
  id: string
  name: string
  username: string
  avatarUrl: string
  role: "Educator" | "Student" | "Admin"
  bio: string
  subjects: string[]
  followers: number
}

export interface BlogComment {
  id: string
  author: BlogAuthor
  content: string
  timestamp: string
  likes: number
}

export interface BlogPost {
  id: string
  user_id: string
  content: string
  media_url?: string
  media_type?: "image" | "video" | null
  created_at: string
  author: BlogAuthor
  likes: number
  comments: BlogComment[]
  shares: number
  liked: boolean
}

/** * Mock Data Arrays - Cleared 
 */
export const educators: BlogAuthor[] = [];

export const trendingTopics: { tag: string; posts: number }[] = [];

/**
 * Placeholders for UI compatibility
 */
export function generateMockPosts(count: number): BlogPost[] {
  // Returns an empty array to prevent rendering mock items during infinite scroll
  return [];
}

export const initialPosts: BlogPost[] = [];