# Portfolio Admin Architecture

## Overview
This portfolio website follows a clean architecture pattern with separation of concerns, proper service layers, and type-first development.

## Architecture Structure

### File Structure
```
src/
├── components/
│   └── admin/
│       ├── ProjectsSection.tsx    # Project management section
│       └── ProjectUpload.tsx      # Project upload/edit modal
├── lib/
│   └── firebase.ts                # Firebase configuration
├── pages/
│   ├── AdminLogin.jsx             # Login page (/admin)
│   └── admin.jsx                  # Admin dashboard (/admin/dashboard)
├── services/
│   └── projectService.ts          # Project business logic
├── types/
│   └── projects.ts                # Project type definitions
└── App.jsx                        # Main app with routing

```

## Key Patterns

### 1. Service Layer Pattern
All business logic is handled through service classes.

**Example:**
```typescript
// services/projectService.ts
export class ProjectService {
  static async createProject(projectData: CreateProjectData): Promise<string>
  static async getAllProjects(limitCount: number = 50): Promise<Project[]>
  static async updateProject(projectId: string, projectData: UpdateProjectData): Promise<void>
  static async deleteProject(projectId: string): Promise<void>
  static async uploadProjectImage(file: File): Promise<string>
  static async toggleFeatured(projectId: string, featured: boolean): Promise<void>
}
```

### 2. Type-First Development
Define all types first, then build services and components around them.

**Example:**
```typescript
// types/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  // ... other fields
}

export interface CreateProjectData {
  // Creation-specific fields
}

export interface UpdateProjectData {
  // Update-specific fields (all optional)
}
```

### 3. Switch Statement Pattern for Admin
Use switch statements to render different sections in the admin dashboard.

**Example:**
```javascript
const renderContent = () => {
  switch (activeSection) {
    case 'projects':
      return <ProjectsSection />;
    case 'settings':
      return <SettingsSection />;
    default:
      return <ProjectsSection />;
  }
};
```

### 4. Secure Authentication
- Firebase Authentication for user login
- Firestore `users` collection for storing user data and admin permissions
- Check `isAdmin: true` flag before allowing access

**Example:**
```javascript
// Check if user is admin
const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
const userDocs = await getDocs(userQuery);

if (userDocs.empty || !userDocs.docs[0].data().isAdmin) {
  // Not admin, deny access
}
```

## Routes

### Public Routes
- `/` - Main portfolio page

### Admin Routes
- `/admin` - Admin login page
- `/admin/dashboard` - Admin dashboard (requires authentication)

## Components

### AdminLogin (`/admin`)
- Handles user authentication
- Validates admin status in Firestore
- Redirects to dashboard on success
- Uses React Toast for notifications

### AdminDashboard (`/admin/dashboard`)
- Protected route (requires authentication)
- Sidebar navigation with switch statement
- Different sections for managing content
- Sign out functionality

### ProjectsSection
- Displays all portfolio projects in a grid
- CRUD operations (Create, Read, Update, Delete)
- Toggle featured status
- Opens ProjectUpload modal for add/edit

### ProjectUpload
- Modal for creating/editing projects
- Image upload with preview
- Form validation
- Uses ProjectService for saving

## Services

### ProjectService
Handles all project-related business logic:
- Create new projects
- Fetch all projects
- Update existing projects
- Delete projects (including storage cleanup)
- Upload project images to Firebase Storage
- Toggle featured status

## Types

### Project
Main project interface with all fields:
- Basic info (title, description, technologies)
- Links (live link, GitHub)
- Media (image, optional video)
- Metadata (featured, category, timestamps)

### CreateProjectData
Data required to create a new project.

### UpdateProjectData
Optional fields for updating a project.

## Security

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Users collection - users can read their own doc, only admins can write
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if isAdmin();
    }
    
    // Projects collection - anyone can read, only admins can write
    match /projects/{projectId} {
      allow read: if true;  // Public read for portfolio display
      allow write: if isAdmin();
    }
    
    // Everything else is admin-only
    match /{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /portfolio/{allPaths=**} {
      allow read: if true;  // Anyone can read
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
  }
}
```

## Setup Instructions

### 1. Firebase Configuration
Create a `.env` file with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. Create Admin User

#### In Firebase Authentication:
1. Create user with email/password
2. Copy the User UID

#### In Firestore:
Create a `users` collection with a document using the UID as document ID:
```json
{
  "email": "your-email@example.com",
  "isAdmin": true,
  "displayName": "Your Name",
  "createdAt": "timestamp"
}
```

### 3. Apply Security Rules
Copy the rules from `firestore-rules.txt` to Firebase Console.

### 4. Start Development Server
```bash
npm install
npm run dev
```

## Benefits of This Architecture

1. **Separation of Concerns**: Services handle logic, components handle UI
2. **Type Safety**: TypeScript ensures type correctness throughout
3. **Maintainability**: Easy to find and modify code
4. **Scalability**: Easy to add new features and sections
5. **Security**: Proper authentication and authorization
6. **Performance**: Efficient Firebase queries and caching
7. **User Experience**: Toast notifications and loading states

## Adding New Features

To add a new admin section (e.g., "Blog Posts"):

1. **Create Types** (`src/types/blogPost.ts`)
2. **Create Service** (`src/services/blogPostService.ts`)
3. **Create Section Component** (`src/components/admin/BlogPostsSection.tsx`)
4. **Add to Admin Dashboard** switch statement
5. **Add Navigation Button** to sidebar

This architecture makes it easy to extend and maintain your portfolio website!

