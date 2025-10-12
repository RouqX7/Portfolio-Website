import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  orderBy, 
  query,
  serverTimestamp,
  limit,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Experience, 
  Education, 
  Skill, 
  AboutMe,
  CreateExperienceData,
  CreateEducationData,
  CreateSkillData,
  UpdateExperienceData,
  UpdateEducationData,
  UpdateSkillData,
  UpdateAboutMeData
} from '../types/resume';

const EXPERIENCES_COLLECTION = 'experiences';
const EDUCATION_COLLECTION = 'education';
const SKILLS_COLLECTION = 'skills';
const ABOUT_ME_COLLECTION = 'aboutMe';

export class ResumeService {
  // ========== EXPERIENCE METHODS ==========
  
  static async createExperience(experienceData: CreateExperienceData): Promise<string> {
    const experienceRef = doc(collection(db, EXPERIENCES_COLLECTION));
    const experienceDoc = {
      id: experienceRef.id,
      ...experienceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await addDoc(collection(db, EXPERIENCES_COLLECTION), experienceDoc);
    return experienceRef.id;
  }

  static async getAllExperiences(): Promise<Experience[]> {
    const experiencesRef = collection(db, EXPERIENCES_COLLECTION);
    const q = query(experiencesRef, orderBy('order', 'asc'), orderBy('startDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Experience));
  }

  static async updateExperience(experienceId: string, experienceData: UpdateExperienceData): Promise<void> {
    const experienceRef = doc(db, EXPERIENCES_COLLECTION, experienceId);
    await updateDoc(experienceRef, {
      ...experienceData,
      updatedAt: serverTimestamp()
    });
  }

  static async deleteExperience(experienceId: string): Promise<void> {
    const experienceRef = doc(db, EXPERIENCES_COLLECTION, experienceId);
    await deleteDoc(experienceRef);
  }

  // ========== EDUCATION METHODS ==========
  
  static async createEducation(educationData: CreateEducationData): Promise<string> {
    const educationRef = doc(collection(db, EDUCATION_COLLECTION));
    const educationDoc = {
      id: educationRef.id,
      ...educationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await addDoc(collection(db, EDUCATION_COLLECTION), educationDoc);
    return educationRef.id;
  }

  static async getAllEducation(): Promise<Education[]> {
    const educationRef = collection(db, EDUCATION_COLLECTION);
    const q = query(educationRef, orderBy('order', 'asc'), orderBy('startDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Education));
  }

  static async updateEducation(educationId: string, educationData: UpdateEducationData): Promise<void> {
    const educationRef = doc(db, EDUCATION_COLLECTION, educationId);
    await updateDoc(educationRef, {
      ...educationData,
      updatedAt: serverTimestamp()
    });
  }

  static async deleteEducation(educationId: string): Promise<void> {
    const educationRef = doc(db, EDUCATION_COLLECTION, educationId);
    await deleteDoc(educationRef);
  }

  // ========== SKILLS METHODS ==========
  
  static async createSkill(skillData: CreateSkillData): Promise<string> {
    const skillRef = doc(collection(db, SKILLS_COLLECTION));
    const skillDoc = {
      id: skillRef.id,
      ...skillData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await addDoc(collection(db, SKILLS_COLLECTION), skillDoc);
    return skillRef.id;
  }

  static async getAllSkills(): Promise<Skill[]> {
    const skillsRef = collection(db, SKILLS_COLLECTION);
    const q = query(skillsRef, orderBy('category', 'asc'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Skill));
  }

  static async getSkillsByCategory(category: string): Promise<Skill[]> {
    const skillsRef = collection(db, SKILLS_COLLECTION);
    const q = query(
      skillsRef, 
      where('category', '==', category),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Skill));
  }

  static async updateSkill(skillId: string, skillData: UpdateSkillData): Promise<void> {
    const skillRef = doc(db, SKILLS_COLLECTION, skillId);
    await updateDoc(skillRef, {
      ...skillData,
      updatedAt: serverTimestamp()
    });
  }

  static async deleteSkill(skillId: string): Promise<void> {
    const skillRef = doc(db, SKILLS_COLLECTION, skillId);
    await deleteDoc(skillRef);
  }

  // ========== ABOUT ME METHODS ==========
  
  static async getAboutMe(): Promise<AboutMe | null> {
    const aboutMeRef = collection(db, ABOUT_ME_COLLECTION);
    const querySnapshot = await getDocs(aboutMeRef);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as AboutMe;
  }

  static async updateAboutMe(content: string): Promise<void> {
    const aboutMeRef = collection(db, ABOUT_ME_COLLECTION);
    const querySnapshot = await getDocs(aboutMeRef);
    
    if (querySnapshot.empty) {
      // Create new document
      await addDoc(aboutMeRef, {
        content,
        updatedAt: serverTimestamp()
      });
    } else {
      // Update existing document
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        content,
        updatedAt: serverTimestamp()
      });
    }
  }
}
