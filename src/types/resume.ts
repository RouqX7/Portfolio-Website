import { Timestamp } from 'firebase/firestore';

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string; // Empty string or null for current position
  description: string;
  technologies?: string[];
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Languages' | 'Tools';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface AboutMe {
  id: string;
  content: string;
  updatedAt: Date | Timestamp;
}

export interface CV {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date | Timestamp;
  isActive: boolean;
}

export interface CVVideo {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date | Timestamp;
  isActive: boolean;
}

// Create types
export interface CreateExperienceData {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies?: string[];
}

export interface CreateEducationData {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
}

export interface CreateSkillData {
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Languages' | 'Tools';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

// Update types
export interface UpdateExperienceData extends Partial<CreateExperienceData> {}
export interface UpdateEducationData extends Partial<CreateEducationData> {}
export interface UpdateSkillData extends Partial<CreateSkillData> {}
export interface UpdateAboutMeData {
  content: string;
}
