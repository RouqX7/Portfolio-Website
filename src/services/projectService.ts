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
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Project, CreateProjectData, UpdateProjectData } from '../types/projects';

const PROJECTS_COLLECTION = 'projects';

export class ProjectService {
  // Create
  static async createProject(projectData: CreateProjectData): Promise<string> {
    const projectRef = doc(collection(db, PROJECTS_COLLECTION));
    const projectDoc = {
      id: projectRef.id,
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await addDoc(collection(db, PROJECTS_COLLECTION), projectDoc);
    return projectRef.id;
  }

  // Read
  static async getProject(projectId: string): Promise<Project | null> {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    const projectSnap = await getDoc(projectRef);
    return projectSnap.exists() ? projectSnap.data() as Project : null;
  }

  static async getAllProjects(limitCount: number = 50): Promise<Project[]> {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
  }

  static async getFeaturedProjects(limitCount: number = 10): Promise<Project[]> {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Project))
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

