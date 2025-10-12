import { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  category: 'Web' | 'Mobile' | 'Desktop' | 'Backend' | 'Other';
  liveLink?: string; // Optional for Backend projects
  githubLink: string;
  imageSrc: string;
  videoSrc?: string;
  videoFile?: File; // For upload handling
  featured: boolean;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface CreateProjectData {
  title: string;
  description: string;
  technologies: string;
  category: 'Web' | 'Mobile' | 'Desktop' | 'Backend' | 'Other';
  liveLink?: string; // Optional for Backend projects
  githubLink: string;
  imageSrc: string;
  videoSrc?: string;
  featured: boolean;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  technologies?: string;
  category?: 'Web' | 'Mobile' | 'Desktop' | 'Backend' | 'Other';
  liveLink?: string;
  githubLink?: string;
  imageSrc?: string;
  videoSrc?: string;
  featured?: boolean;
}
