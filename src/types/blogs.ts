import { Timestamp } from 'firebase/firestore';

export interface BlogSection {
  id: string; // Unique ID within the blog
  title?: string; // Optional subtitle/header for the section
  text: string;
  photos: string[]; // Array of photo URLs
  order: number; // For ordering sections
}

export interface Blog {
  id: string;
  projectId: string; // Links to a project
  title: string;
  sections: BlogSection[];
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface CreateBlogData {
  projectId: string;
  title: string;
  sections: Omit<BlogSection, 'id'>[]; // Sections without IDs (will be generated)
}

export interface UpdateBlogData {
  title?: string;
  sections?: BlogSection[];
}

export interface CreateBlogSectionData {
  title?: string;
  text: string;
  photos: string[];
  order: number;
}

export interface UpdateBlogSectionData {
  title?: string;
  text?: string;
  photos?: string[];
  order?: number;
}

