import { 
  collection, 
  addDoc, 
  setDoc,
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { 
  Experience, 
  Education, 
  Skill, 
  AboutMe,
  CV,
  CVVideo,
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
const CV_COLLECTION = 'cvs';
const CV_VIDEOS_COLLECTION = 'cvVideos';

export class ResumeService {
  // ========== EXPERIENCE METHODS ==========
  
  static async createExperience(experienceData: CreateExperienceData): Promise<string> {
    const experienceRef = doc(collection(db, EXPERIENCES_COLLECTION));
    const experienceDoc = {
      ...experienceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(experienceRef, experienceDoc);
    return experienceRef.id;
  }

  static async getAllExperiences(): Promise<Experience[]> {
    const experiencesRef = collection(db, EXPERIENCES_COLLECTION);
    const q = query(experiencesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const { id: _, ...rest } = data;
      return {
        id: doc.id, // Use the actual Firestore document ID
        ...rest
      } as Experience;
    });
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
      ...educationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(educationRef, educationDoc);
    return educationRef.id;
  }

  static async getAllEducation(): Promise<Education[]> {
    const educationRef = collection(db, EDUCATION_COLLECTION);
    const q = query(educationRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const { id: _, ...rest } = data;
      return {
        id: doc.id, // Use the actual Firestore document ID
        ...rest
      } as Education;
    });
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
      ...skillData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(skillRef, skillDoc);
    return skillRef.id;
  }

  static async getAllSkills(): Promise<Skill[]> {
    const skillsRef = collection(db, SKILLS_COLLECTION);
    const q = query(skillsRef, orderBy('category', 'asc'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const { id: _, ...rest } = data;
      return {
        id: doc.id, // Use the actual Firestore document ID
        ...rest
      } as Skill;
    });
  }

  static async getSkillsByCategory(category: string): Promise<Skill[]> {
    const skillsRef = collection(db, SKILLS_COLLECTION);
    const q = query(
      skillsRef, 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const { id: _, ...rest } = data;
      return {
        id: doc.id, // Use the actual Firestore document ID
        ...rest
      } as Skill;
    });
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

  // ========== CV METHODS ==========
  
  static async uploadCV(file: File): Promise<string> {
    // Upload file to Firebase Storage
    const storageRef = ref(storage, `cvs/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Deactivate all existing CVs
    const cvsRef = collection(db, CV_COLLECTION);
    const querySnapshot = await getDocs(cvsRef);
    const updatePromises = querySnapshot.docs.map(doc => 
      updateDoc(doc.ref, { isActive: false })
    );
    await Promise.all(updatePromises);
    
    // Add new CV as active
    await addDoc(cvsRef, {
      fileName: file.name,
      fileUrl: downloadURL,
      uploadedAt: serverTimestamp(),
      isActive: true
    });
    
    return downloadURL;
  }

  static async getActiveCV(): Promise<CV | null> {
    const cvsRef = collection(db, CV_COLLECTION);
    const q = query(cvsRef, where('isActive', '==', true), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as CV;
  }

  static async getAllCVs(): Promise<CV[]> {
    const cvsRef = collection(db, CV_COLLECTION);
    const q = query(cvsRef, orderBy('uploadedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CV));
  }

  static async setActiveCV(cvId: string): Promise<void> {
    // Deactivate all CVs
    const cvsRef = collection(db, CV_COLLECTION);
    const querySnapshot = await getDocs(cvsRef);
    const updatePromises = querySnapshot.docs.map(doc => 
      updateDoc(doc.ref, { isActive: false })
    );
    await Promise.all(updatePromises);
    
    // Activate selected CV
    const cvRef = doc(db, CV_COLLECTION, cvId);
    await updateDoc(cvRef, { isActive: true });
  }

  static async deleteCV(cvId: string): Promise<void> {
    // Get CV data to delete from storage
    const cvRef = doc(db, CV_COLLECTION, cvId);
    const cvDoc = await getDoc(cvRef);
    
    if (cvDoc.exists()) {
      const cvData = cvDoc.data() as CV;
      
      // Delete from Storage if it's a Firebase URL
      if (cvData.fileUrl && cvData.fileUrl.includes('firebase')) {
        try {
          const fileRef = ref(storage, cvData.fileUrl);
          await deleteObject(fileRef);
        } catch (error) {
          console.error('Error deleting CV from storage:', error);
        }
      }
    }
    
    // Delete from Firestore
    await deleteDoc(cvRef);
  }

  // ========== CV VIDEO METHODS ==========

  static async uploadCVVideo(file: File): Promise<string> {
    const storageRef = ref(storage, `cv-videos/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const videosRef = collection(db, CV_VIDEOS_COLLECTION);
    const querySnapshot = await getDocs(videosRef);
    const deactivatePromises = querySnapshot.docs.map(doc =>
      updateDoc(doc.ref, { isActive: false })
    );
    await Promise.all(deactivatePromises);

    await addDoc(videosRef, {
      fileName: file.name,
      fileUrl: downloadURL,
      uploadedAt: serverTimestamp(),
      isActive: true
    });

    return downloadURL;
  }

  static async getActiveCVVideo(): Promise<CVVideo | null> {
    const videosRef = collection(db, CV_VIDEOS_COLLECTION);
    const q = query(videosRef, where('isActive', '==', true), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnapshot = querySnapshot.docs[0];
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    } as CVVideo;
  }

  static async getAllCVVideos(): Promise<CVVideo[]> {
    const videosRef = collection(db, CV_VIDEOS_COLLECTION);
    const q = query(videosRef, orderBy('uploadedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CVVideo));
  }

  static async setActiveCVVideo(videoId: string): Promise<void> {
    const videosRef = collection(db, CV_VIDEOS_COLLECTION);
    const querySnapshot = await getDocs(videosRef);
    const deactivatePromises = querySnapshot.docs.map(doc =>
      updateDoc(doc.ref, { isActive: false })
    );
    await Promise.all(deactivatePromises);

    const videoRef = doc(db, CV_VIDEOS_COLLECTION, videoId);
    await updateDoc(videoRef, { isActive: true });
  }

  static async deleteCVVideo(videoId: string): Promise<void> {
    const videoRef = doc(db, CV_VIDEOS_COLLECTION, videoId);
    const videoDoc = await getDoc(videoRef);

    if (videoDoc.exists()) {
      const videoData = videoDoc.data() as CVVideo;

      if (videoData.fileUrl && videoData.fileUrl.includes('firebase')) {
        try {
          const fileRef = ref(storage, videoData.fileUrl);
          await deleteObject(fileRef);
        } catch (error) {
          console.error('Error deleting CV video from storage:', error);
        }
      }
    }

    await deleteDoc(videoRef);
  }
}
