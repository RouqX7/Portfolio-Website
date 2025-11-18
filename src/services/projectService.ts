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
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Project, CreateProjectData, UpdateProjectData } from '../types/projects';

const PROJECTS_COLLECTION = 'projects';

export class ProjectService {
  // Create
  static async createProject(projectData: CreateProjectData): Promise<string> {
    // Create a document reference with auto-generated ID
    const projectRef = doc(collection(db, PROJECTS_COLLECTION));
    const projectDoc = {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    // Use setDoc to create the document with the specific ID
    await setDoc(projectRef, projectDoc);
    return projectRef.id;
  }

  // Read
  static async getProject(projectId: string): Promise<Project | null> {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    const projectSnap = await getDoc(projectRef);
    if (!projectSnap.exists()) return null;
    const data = projectSnap.data();
    const { id: _, ...rest } = data;
    return {
      id: projectSnap.id, // Use the actual Firestore document ID
      ...rest
    } as Project;
  }

  static async getAllProjects(limitCount: number = 50): Promise<Project[]> {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Remove the 'id' field from data if it exists (from old documents)
      const { id: _, ...rest } = data;
      return {
        id: doc.id, // Use the actual Firestore document ID
        ...rest
      } as Project;
    });
  }

  static async getFeaturedProjects(limitCount: number = 10): Promise<Project[]> {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        const { id: _, ...rest } = data;
        return {
          id: doc.id, // Use the actual Firestore document ID
          ...rest
        } as Project;
      })
      .filter(project => project.featured)
      .slice(0, limitCount);
  }

  // Update
  static async updateProject(projectId: string, projectData: UpdateProjectData): Promise<void> {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: serverTimestamp()
    });
  }

  // Delete
  static async deleteProject(projectId: string): Promise<void> {
    const project = await this.getProject(projectId);
    if (!project) return;

    // Delete from Firestore
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(projectRef);

    // Delete image from Storage if it exists
    if (project.imageSrc && project.imageSrc.includes('firebase')) {
      try {
        const imageRef = ref(storage, project.imageSrc);
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    }

    // Delete video from Storage if it exists
    if (project.videoSrc && project.videoSrc.includes('firebase')) {
      try {
        const videoRef = ref(storage, project.videoSrc);
        await deleteObject(videoRef);
      } catch (error) {
        console.error('Error deleting video from storage:', error);
      }
    }
  }

  // Upload image
  static async uploadProjectImage(file: File): Promise<string> {
    const storageRef = ref(storage, `portfolio/images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  // Upload video
  static async uploadProjectVideo(file: File): Promise<string> {
    const storageRef = ref(storage, `portfolio/videos/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  // Toggle featured
  static async toggleFeatured(projectId: string, featured: boolean): Promise<void> {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      featured,
      updatedAt: serverTimestamp()
    });
  }
}

