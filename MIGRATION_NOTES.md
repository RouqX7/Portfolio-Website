# Migration from `admins` to `users` Collection

## Summary
Changed from using a separate `admins` collection to a unified `users` collection with an `isAdmin` field. This is a best practice that:
- Centralizes user data in one collection
- Makes it easier to add more user roles in the future
- Follows standard authentication patterns

## What Changed

### Database Structure
**Before:**
```
admins/
  └── {randomId}
      ├── email: "admin@example.com"
      └── isAdmin: true
```

**After:**
```
users/
  └── {userId (UID from Firebase Auth)}
      ├── email: "admin@example.com"
      ├── isAdmin: true
      ├── displayName: "Your Name" (optional)
      └── createdAt: timestamp (optional)
```

### Code Changes
All authentication checks now query the `users` collection instead of `admins`:

**Files Updated:**
- `src/pages/AdminLogin.jsx` - Login authentication check
- `src/pages/admin.jsx` - Dashboard authentication check
- `firestore-rules.txt` - Security rules
- `ADMIN_SETUP.md` - Setup instructions
- `ARCHITECTURE.md` - Architecture documentation

### Security Rules Changes
New rules include:
- Helper function `isAdmin()` for cleaner rule writing
- Users can read their own document
- Only admins can write to users collection
- Projects are publicly readable, admin-writable

## Migration Steps

If you have existing `admins` collection data:

### Option 1: Manual Migration (Recommended)
1. Go to Firebase Console → Authentication
2. Note your user's UID
3. Go to Firestore Database
4. Create `users` collection
5. Create document with UID as document ID
6. Add fields: `email`, `isAdmin: true`
7. Delete old `admins` collection

### Option 2: Keep Both (Not Recommended)
You could keep the old `admins` collection, but it's cleaner to migrate to the new structure.

## Benefits of This Change

1. **Standard Pattern**: Using UID as document ID is Firebase best practice
2. **Easier Queries**: Direct document access by UID is faster than querying by email
3. **Scalability**: Easy to add more user fields and roles
4. **Security**: Better alignment with Firebase Auth's user model
5. **Future-Proof**: Easy to extend with user profiles, preferences, etc.

## Future Enhancements

With the `users` collection, you can easily add:
- User profiles with avatar, bio, etc.
- Multiple role levels (admin, editor, viewer)
- User activity tracking
- Last login timestamps
- User preferences and settings

## Rollback (If Needed)

If you need to rollback to the old `admins` collection:
1. Revert the code changes in `AdminLogin.jsx` and `admin.jsx`
2. Change `users` back to `admins` in queries
3. Update security rules

But we recommend keeping the new structure as it follows best practices!

