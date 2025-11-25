import { 
  collection, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  orderBy, 
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Blog, CreateBlogData, UpdateBlogData, BlogSection } from '../types/blogs';

const BLOGS_COLLECTION = 'blogs';

export class BlogService {
  // ========== BLOG CRUD ==========
  
  static async createBlog(blogData: CreateBlogData): Promise<string> {
    const blogRef = doc(collection(db, BLOGS_COLLECTION));
    const timestamp = Date.now();
    // Generate IDs for sections and subsections
    const sectionsWithIds: BlogSection[] = blogData.sections.map((section, sectionIndex) => ({
      id: `section-${timestamp}-${sectionIndex}`,
      title: section.title,
      photos: section.photos,
      order: section.order,
      subsections: section.subsections.map((subsection, subIndex) => ({
        id: `subsection-${timestamp}-${sectionIndex}-${subIndex}`,
        title: subsection.title,
        text: subsection.text
      }))
    }));
    
    const blogDoc = {
      projectId: blogData.projectId,
      title: blogData.title,
      sections: sectionsWithIds,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(blogRef, blogDoc);
    return blogRef.id;
  }

  static async getBlog(blogId: string): Promise<Blog | null> {
    const blogRef = doc(db, BLOGS_COLLECTION, blogId);
    const blogSnap = await getDoc(blogRef);
    if (!blogSnap.exists()) return null;
    const data = blogSnap.data();
    return {
      id: blogSnap.id,
      ...data
    } as Blog;
  }

  static async getBlogByProjectId(projectId: string): Promise<Blog | null> {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const q = query(blogsRef, where('projectId', '==', projectId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data
    } as Blog;
  }

  static async getAllBlogs(): Promise<Blog[]> {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      } as Blog;
    });
  }

  static async updateBlog(blogId: string, blogData: UpdateBlogData): Promise<void> {
    const blogRef = doc(db, BLOGS_COLLECTION, blogId);
    await updateDoc(blogRef, {
      ...blogData,
      updatedAt: serverTimestamp()
    });
  }

  static async deleteBlog(blogId: string): Promise<void> {
    const blog = await this.getBlog(blogId);
    if (!blog) return;

    // Delete all photos from storage
    for (const section of blog.sections) {
      for (const photoUrl of section.photos) {
        if (photoUrl.includes('firebase')) {
          try {
            const photoRef = ref(storage, photoUrl);
            await deleteObject(photoRef);
          } catch (error) {
            console.error('Error deleting photo from storage:', error);
          }
        }
      }
    }

    // Delete from Firestore
    const blogRef = doc(db, BLOGS_COLLECTION, blogId);
    await deleteDoc(blogRef);
  }

  // ========== BLOG SECTION METHODS ==========
  
  static async addSectionToBlog(blogId: string, section: Omit<BlogSection, 'id'>): Promise<string> {
    const blog = await this.getBlog(blogId);
    if (!blog) throw new Error('Blog not found');

    const newSection: BlogSection = {
      id: `section-${Date.now()}-${blog.sections.length}`,
      ...section
    };

    const updatedSections = [...blog.sections, newSection];
    await this.updateBlog(blogId, { sections: updatedSections });
    return newSection.id;
  }

  static async updateSectionInBlog(blogId: string, sectionId: string, sectionData: Partial<Omit<BlogSection, 'id'>>): Promise<void> {
    const blog = await this.getBlog(blogId);
    if (!blog) throw new Error('Blog not found');

    const updatedSections = blog.sections.map(section => 
      section.id === sectionId 
        ? { ...section, ...sectionData }
        : section
    );

    await this.updateBlog(blogId, { sections: updatedSections });
  }

  static async deleteSectionFromBlog(blogId: string, sectionId: string): Promise<void> {
    const blog = await this.getBlog(blogId);
    if (!blog) throw new Error('Blog not found');

    const sectionToDelete = blog.sections.find(s => s.id === sectionId);
    if (sectionToDelete) {
      // Delete photos from storage
      for (const photoUrl of sectionToDelete.photos) {
        if (photoUrl.includes('firebase')) {
          try {
            const photoRef = ref(storage, photoUrl);
            await deleteObject(photoRef);
          } catch (error) {
            console.error('Error deleting photo from storage:', error);
          }
        }
      }
    }

    const updatedSections = blog.sections.filter(section => section.id !== sectionId);
    await this.updateBlog(blogId, { sections: updatedSections });
  }

  static async reorderSections(blogId: string, sectionIds: string[]): Promise<void> {
    const blog = await this.getBlog(blogId);
    if (!blog) throw new Error('Blog not found');

    const reorderedSections = sectionIds.map((id, index) => {
      const section = blog.sections.find(s => s.id === id);
      if (!section) throw new Error(`Section ${id} not found`);
      return { ...section, order: index };
    });

    await this.updateBlog(blogId, { sections: reorderedSections });
  }

  // ========== PHOTO UPLOAD ==========
  
  static async uploadBlogPhoto(file: File, blogId: string, sectionId: string): Promise<string> {
    // Use projectId if blogId starts with 'temp-' for new blogs
    const pathPrefix = blogId.startsWith('temp-') 
      ? `blogs/temp/${blogId.replace('temp-', '')}/${sectionId}`
      : `blogs/${blogId}/${sectionId}`;
    const storageRef = ref(storage, `${pathPrefix}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  static async deleteBlogPhoto(photoUrl: string): Promise<void> {
    if (photoUrl.includes('firebase')) {
      try {
        // Extract the path from the Firebase Storage URL
        // URL format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token=...
        const url = new URL(photoUrl);
        const pathMatch = url.pathname.match(/\/o\/(.+)/);
        if (pathMatch) {
          const decodedPath = decodeURIComponent(pathMatch[1]);
          const photoRef = ref(storage, decodedPath);
          await deleteObject(photoRef);
        }
      } catch (error) {
        console.error('Error deleting photo from storage:', error);
        throw error;
      }
    }
  }
}

