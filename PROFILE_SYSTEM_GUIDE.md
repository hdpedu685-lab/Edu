# Social Media Profile System - Implementation Guide

## Overview
A complete social-media style profile system (similar to Facebook/LinkedIn) has been successfully implemented for your EDU website. This guide explains the architecture, features, and how to use it.

---

## Backend Files Created/Modified

### 1. **convex/profiles.ts** (New)
A dedicated module for profile-related queries and mutations:

- **`getByUsername(args)`** - Query that finds a profile by username
  - Resolves `avatarId` to a URL via `ctx.storage.getUrl()`
  - Returns complete profile object with resolved avatar URL
  
- **`updateProfile(args)`** - Mutation for editing profiles
  - Requires authentication (`getAuthUserId`)
  - Only the profile owner can edit their own profile (security check)
  - Validates that `userId` matches the authenticated user
  - Handles: `displayName`, `bio`, `subjects` (array), `avatarId`
  - Subjects array is properly validated to prevent `ArgumentValidationError`
  
- **`getCurrentUserProfile(args)`** - Query for the logged-in user's profile

### 2. **convex/users.ts** (Modified)
Added the `updateProfile` mutation to users.ts for immediate availability:

```typescript
export const updateProfile = mutation({
  args: {
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    subjects: v.optional(v.array(v.string())),
    avatarId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => { ... }
})
```

> **Note**: The mutation has built-in security checks to ensure users can only edit their own profiles.

---

## Frontend Files Created

### **app/u/[username]/page.tsx** (New)
A professional "Academic Portfolio" page with:

#### Features:
1. **URL Parameter Handling**
   - Captures `[username]` from the URL
   - Dynamically fetches profile using `getByUsername` query

2. **Professional Portfolio Layout**
   ```
   ┌─────────────────────────────────────────┐
   │           Hero Section                  │
   │  • Large circular avatar (with ring)    │
   │  • Display name + username              │
   │  • Role badge (if available)            │
   │  • Edit Portfolio button (if own profile)│
   └─────────────────────────────────────────┘
   ┌──────────────┬──────────────────────────┐
   │   Sidebar    │    Main Content          │
   │              │                          │
   │ • About Me   │ • Student Projects       │
   │   (bio)      │   (4-column grid)        │
   │              │                          │
   │ • Interests/ │ • Activity &             │
   │   Skills     │   Achievements           │
   │   (badges)   │   (timeline)             │
   └──────────────┴──────────────────────────┘
   ```

3. **Edit Portfolio Dialog**
   - Opens when clicking "Edit Portfolio" button (only visible to profile owner)
   - Fields: Display Name, Bio, Interests/Subjects (comma-separated)
   - Real-time input handling
   - Save button with mutation error handling

4. **Authentication Logic** (via `user-context.tsx`)
   - Checks if logged-in user's name matches the page's profile
   - Shows "Edit Portfolio" button only for own profile
   - Integrates with existing `useUser()` hook

5. **Animation & Styling**
   - Framer Motion animations for smooth transitions
   - Gradient hero section (blue to purple)
   - Responsive design (mobile, tablet, desktop)
   - Shadcn/ui components throughout
   - Professional color scheme with hover effects

---

## Validation & Error Handling

### Schema Compliance ✓
All mutations properly validate against `convex/schema.ts` validators:

```typescript
// Subjects array validation
- Type: v.array(v.string())
- Validated before mutation
- Handled correctly in form (comma-separated input → array)

// displayName validation
- Type: v.string()
- Always required

// bio validation
- Type: v.string()
- Optional field

// avatarId validation  
- Type: v.id("_storage")
- Optional field
- Properly typed to prevent ArgumentValidationError
```

### Security Measures ✓
1. **Authentication Check**: `getAuthUserId(ctx)` verifies user is logged in
2. **Ownership Verification**: Profile mutation confirms `profile.userId === userId`
3. **Field Validation**: Type checking for all inputs (especially array validation for subjects)
4. **Unauthorized Prevention**: Throws error if user tries to edit another's profile

---

## User Flow

### Viewing a Profile
1. User navigates to `/u/[username]` (e.g., `/u/john.doe-1a2b`)
2. Page fetches profile via `api.users.getByUsername()`
3. Profile displays with:
   - Hero section with avatar
   - Bio and subjects in sidebar
   - Student projects placeholder grid
   - Activity timeline

### Editing Own Profile
1. Profile owner sees "Edit Portfolio" button
2. Clicks button → Dialog opens
3. Edits fields:
   - Display Name: Direct input
   - Bio: Multiline textarea
   - Interests/Subjects: Comma-separated (e.g., "Web Dev, Korean, Business")
4. Clicks "Save Changes"
5. Mutation validates and updates profile
6. Dialog closes, page refreshes with new data

### Permission Flow
```
Visit /u/[username]
  ↓
Fetch profile via getByUsername()
  ↓
Check: currentUser.name === profile.displayName?
  ├─ YES → Show "Edit Portfolio" button
  └─ NO  → Hide button (view-only)
  ↓
Click "Edit Portfolio" → Open dialog
  ↓
Edit fields → Click "Save"
  ↓
Call updateProfile mutation
  ↓
Server verifies: auth.getUserId() matches profile.userId
  ├─ Match  → Update profile, return new data
  └─ Mismatch → Throw "Unauthorized" error
```

---

## API Endpoints

### Queries
```typescript
api.users.getByUsername({ username: "john.doe-1a2b" })
// Returns: { _id, userId, displayName, username, avatarUrl, bio, role, subjects, _creationTime }
```

### Mutations
```typescript
api.users.updateProfile({
  displayName: "John Doe",           // optional
  bio: "Full-stack developer",       // optional
  subjects: ["React", "TypeScript"], // optional - array of strings
  avatarId: "storageId123"           // optional
})
// Returns: Updated profile object
```

---

## Integration with Existing Code

### Dependencies
- ✓ `lib/user-context.tsx` - Authentication and user data
- ✓ `convex/schema.ts` - Profile table schema
- ✓ `components/ui/*` - Shadcn UI components (Button, Dialog, Badge, Card, etc.)
- ✓ `framer-motion` - Animations
- ✓ `lucide-react` - Icons

### Backward Compatibility
- ✓ No breaking changes to existing code
- ✓ Works seamlessly with existing `upsertProfile` in users.ts
- ✓ Compatible with current authentication system

---

## Testing Checklist

- [ ] Create a user account
- [ ] Navigate to profile page (`/u/[your-username]`)
- [ ] Verify profile displays correctly
- [ ] Click "Edit Portfolio" and update fields
- [ ] Test comma-separated subjects input
- [ ] Try accessing another user's profile (verify no edit button)
- [ ] Try editing another user's profile directly (verify error)
- [ ] Test with/without profile picture
- [ ] Test mobile responsiveness

---

## Future Enhancements

### Suggested Features
1. **Student Projects Section**
   - Create dynamic project cards
   - Link to project details page
   - Add project images/videos

2. **Activity & Achievements**
   - Track course completions
   - Display badges/certificates
   - Show activity timeline

3. **Profile Customization**
   - Theme selection
   - Background customization
   - Custom sections

4. **Social Features**
   - Follow/Unfollow
   - Profile views counter
   - Connection requests

5. **Advanced Search**
   - Search profiles by skills
   - Filter by subjects/interests
   - Sort by achievements

---

## Important Notes

### Username Generation
Usernames are auto-generated in the format: `displayname.username-userid`
- Example: `john.doe-1a2b`
- Created during profile upsert in `users.ts`

### Avatar Storage
- Avatars stored in Convex Storage (`_storage` table)
- `avatarId` stored in database, URL resolved at query time via `ctx.storage.getUrl()`
- Prevents broken links if storage structure changes

### Error Messages
- "Not authenticated" - User not logged in
- "Profile not found" - Username doesn't exist
- "Unauthorized" - Trying to edit someone else's profile
- "Subjects must be an array" - Invalid subject format

---

## File Structure Summary

```
convex/
├── profiles.ts          ← NEW (reference implementation)
├── users.ts             ← MODIFIED (added updateProfile)
├── schema.ts            ← Unchanged (profiles table)
└── ...

app/
├── u/
│   └── [username]/
│       └── page.tsx     ← NEW (profile portfolio page)
└── ...

lib/
├── user-context.tsx     ← Unchanged (used for auth)
└── ...
```

---

## Quick Start

1. **Start dev server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Navigate to profile**
   - Create account if needed
   - Go to `/u/[your-username]`

3. **Edit profile**
   - Click "Edit Portfolio"
   - Update information
   - Save changes

---

## Support

For issues or questions:
1. Check that subjects input is comma-separated
2. Verify user is authenticated before editing
3. Check browser console for mutation errors
4. Ensure profile exists before trying to view/edit
