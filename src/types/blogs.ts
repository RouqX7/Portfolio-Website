import { Timestamp } from 'firebase/firestore';

export interface BlogSubsection {
  id: string; // Unique ID within the section
  title: string; // Bold header for the subsection
  text: string; // Text content for the subsection
}

export interface BlogSection {
  id: string; // Unique ID within the blog
  title?: string; // Optional title for the section/page
  text?: string; // Legacy field - for backwards compatibility with old blogs
  subsections?: BlogSubsection[]; // Subsections with headers and text (preferred structure)
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

export interface CreateBlogSectionInput {
  title?: string;
  subsections: Array<{ title: string; text: string }>;
  photos: string[];
  order: number;
}

export interface CreateBlogData {
  projectId: string;
  title: string;
  sections: CreateBlogSectionInput[]; // Sections without IDs (will be generated)
}

export interface UpdateBlogData {
  title?: string;
  sections?: BlogSection[];
}

export interface CreateBlogSectionData {
  title?: string;
  subsections: Omit<BlogSubsection, 'id'>[];
  photos: string[];
  order: number;
}

export interface UpdateBlogSectionData {
  title?: string;
  subsections?: BlogSubsection[];
  photos?: string[];
  order?: number;
}

export interface CreateBlogSubsectionData {
  title: string;
  text: string;
}

export interface UpdateBlogSubsectionData {
  title?: string;
  text?: string;
}

