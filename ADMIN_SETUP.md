# Portfolio Admin Dashboard Setup Guide

## 🚀 What You Get

A complete admin dashboard for managing your portfolio projects with:
- ✅ **Project CRUD Operations** (Create, Read, Update, Delete)
- ✅ **Image Uploads** to Firebase Storage
- ✅ **Authentication** with Firebase Auth
- ✅ **Real-time Database** with Firestore
- ✅ **Responsive Design** with Tailwind CSS

## 📋 Prerequisites

1. **Firebase Project**: You already have `portfolio-website-cc60d`
2. **Firebase Services**: Need to enable Firestore, Storage, and Auth

## 🔧 Setup Steps

### 1. Enable Firebase Services

Go to [Firebase Console](https://console.firebase.google.com/project/portfolio-website-cc60d):

#### Enable Firestore Database:
- Click "Firestore Database" in left sidebar
- Click "Create Database"
- Choose "Start in test mode" (for now)
- Select a location (choose closest to you)
- Click "Done"

#### Enable Storage:
- Click "Storage" in left sidebar
- Click "Get Started"
- Choose "Start in test mode"
- Select same location as Firestore
- Click "Done"

#### Enable Authentication:
- Click "Authentication" in left sidebar
- Click "Get Started"
- Go to "Sign-in method" tab
- Enable "Email/Password"
- Click "Save"

### 2. Create Admin User

1. In Authentication section, click "Users" tab
2. Click "Add User"
3. Enter your email and password (this will be your admin login)
4. Click "Add User"

### 3. Set Up Environment Variables

1. Copy the content from `env-template.txt`
2. Create a new file called `.env` in your project root
3. Fill in your Firebase config values:

```bash
# Get these from Firebase Console > Project Settings > General > Your Apps
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=portfolio-website-cc60d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=portfolio-website-cc60d
VITE_FIREBASE_STORAGE_BUCKET=portfolio-website-cc60d.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Set Up Firestore Security Rules

In Firestore Database > Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{document} {
      allow read: if true;  // Anyone can read projects
      allow write: if request.auth != null;  // Only authenticated users can write
    }
  }
}
```

### 5. Set Up Storage Security Rules

In Storage > Rules, replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /portfolio/{allPaths=**} {
      allow read: if true;  // Anyone can read portfolio images
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
  }
}
```

## 🎯 How to Use

### Access Admin Panel:
1. Navigate to your portfolio site
2. Click "Admin" in the navigation
3. Login with your Firebase credentials

### Add New Project:
1. Click "Add New Project"
2. Fill in project details
3. Upload project image
4. Click "Create Project"

### Edit Project:
1. Click the edit (pencil) icon on any project card
2. Modify details
3. Click "Update Project"

### Delete Project:
1. Click the delete (trash) icon on any project card
2. Confirm deletion

## 🔒 Security Features

- **Authentication Required**: Only logged-in users can modify content
- **Image Validation**: Only image files accepted
- **Secure Storage**: Images stored in Firebase Storage with proper rules
- **Database Rules**: Firestore protected with authentication checks

## 🚨 Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**:
   - Check your `.env` file exists and has correct values
   - Restart your dev server after adding `.env`

2. **"Permission denied" error**:
   - Check Firestore and Storage security rules
   - Ensure you're logged in as admin

3. **Images not uploading**:
   - Check Storage rules allow authenticated uploads
   - Verify Firebase Storage is enabled

4. **Can't login**:
   - Check Authentication is enabled
   - Verify user exists in Firebase Console

## 📱 Features

- **Responsive Design**: Works on all devices
- **Real-time Updates**: Changes appear immediately
- **Image Preview**: See uploaded images before saving
- **Category Management**: Organize projects by type
- **Featured Projects**: Mark important projects
- **Search & Filter**: Easy project management

## 🔄 Next Steps

After setup, you can:
1. **Migrate Existing Projects**: Add your current 5 projects through the admin
2. **Customize Fields**: Add more project properties if needed
3. **Add Video Support**: Extend to handle video uploads
4. **Bulk Import**: Create scripts to import multiple projects

## 📞 Support

If you run into issues:
1. Check Firebase Console for error logs
2. Verify all services are enabled
3. Check browser console for JavaScript errors
4. Ensure `.env` file is properly configured

---

**Happy Admin-ing! 🎉**
