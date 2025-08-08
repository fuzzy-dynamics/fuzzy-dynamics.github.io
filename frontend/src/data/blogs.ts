export interface BlogPost {
  id: number;
  title: string;
  author: string;
  readTime: string;
  excerpt: string;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Launching Theatre",
    author: "Shivansh Subramanian",
    readTime: "3 minutes read",
    excerpt: "We are launching Theatre, a better way to make good new things.",
    publishedAt: "2025-08-04",
  }
];