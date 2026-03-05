# 📖 Profile System - API Reference

## Backend APIs

### Queries

#### `api.users.getByUsername`
Get a profile by username.

```typescript
// Usage
const profile = useQuery(api.users.getByUsername, {
  username: "john.doe-1a2b"
});

// Returns
{
  _id: "profile_id",
  userId: "user_id",
  displayName: "John Doe",
  username: "john.doe-1a2b",
  avatarUrl: "https://storage-url.com/avatar.jpg",  // resolved from avatarId
  bio: "Full-stack developer",
  role: "Student",
  subjects: ["React", "TypeScript", "Node.js"],
  _creationTime: 1700000000000
}

// Returns null if profile not found
```

---

#### `api.users.currentUser`
Get the current authenticated user's profile.

```typescript
// Usage (automatically called in user-context)
const profile = useQuery(api.users.currentUser, {});

// Returns
{
  _id: "profile_id",
  displayName: "John Doe",
  username: "john.doe-1a2b",
  avatarUrl: "https://storage-url.com/avatar.jpg",
  bio: "Full-stack developer",
  email: "john@example.com"
}

// Returns null if not authenticated
```

---

#### `api.profiles.getByUsername` (Reference)
Reference implementation in profiles.ts.

```typescript
// Same signature as api.users.getByUsername
// Use api.users.getByUsername in production
```

---

### Mutations

#### `api.users.updateProfile`
Update the current user's profile. **Requires authentication**.

```typescript
// Usage
const updateProfile = useMutation(api.users.updateProfile);

await updateProfile({
  displayName: "Jane Doe",
  bio: "New bio here",
  subjects: ["Python", "Data Science"],
  avatarId: "storage_id_xyz"  // optional
});

// All arguments are optional except at least one must be provided

// Returns
{
  _id: "profile_id",
  userId: "user_id",
  displayName: "Jane Doe",
  username: "jane.doe-5c3d",
  avatarUrl: "https://storage-url.com/avatar.jpg",
  bio: "New bio here",
  role: "Student",
  subjects: ["Python", "Data Science"],
  _creationTime: 1700000000000
}

// Throws errors:
// - "Not authenticated" - User not logged in
// - "Profile not found" - User has no profile
// - "Unauthorized" - Trying to edit another user's profile
// - "Subjects must be an array" - Invalid subjects format
```

---

#### `api.users.generateUploadUrl`
Generate a URL for uploading files to Convex Storage.

```typescript
// Usage
const generateUploadUrl = useMutation(api.users.generateUploadUrl);
const uploadUrl = await generateUploadUrl();

// Upload file to the URL
const file = new File(["content"], "avatar.jpg", { type: "image/jpeg" });
const response = await fetch(uploadUrl, {
  method: "POST",
  headers: { "Content-Type": file.type },
  body: file
});

const { storageId } = await response.json();

// Then use storageId when updating profile
await updateProfile({ avatarId: storageId });
```

---

#### `api.users.upsertProfile`
Creates or updates user profile (called after signup).

```typescript
// Usage (called automatically in user-context)
const upsertProfile = useMutation(api.users.upsertProfile);

await upsertProfile({
  displayName: "John Doe",
  username: "john.doe-1a2b",  // optional, auto-generated if not provided
  bio: "My bio",
  subjects: ["React", "TypeScript"],
  avatarId: "storage_id"
});
```

---

## Frontend Components

### Pages

#### `/u/[username]` - Profile Portfolio Page
Professional academic portfolio page for any user.

```typescript
// URL Examples
/u/john.doe-1a2b           // John's profile
/u/jane.smith-5c3d         // Jane's profile
/u/admin-xyz123            // Admin's profile

// Features
- View profile information
- See bio and interests
- View student projects (placeholder)
- View activity timeline (placeholder)
- Edit button (visible only to profile owner)
```

---

### Hooks

#### `useUser()`
Access current user context.

```typescript
import { useUser } from "@/lib/user-context";

const { user, isAuthenticated, isLoading, updateProfile } = useUser();

// user object
{
  name: "John Doe",
  email: "john@example.com",
  coursesPurchased: ["course1", "course2"],
  avatarUrl: "https://..."
}

// updateProfile function signature
updateProfile({
  displayName?: string,
  bio?: string,
  avatarFile?: File  // Note: accepts File object, not storageId
}): Promise<void>
```

---

## Database Schema

### Profiles Table

```typescript
profiles: defineTable({
  userId: v.id("users"),
  displayName: v.string(),
  username: v.string(),
  avatarUrl: v.optional(v.string()),
  avatarId: v.optional(v.id("_storage")),
  bio: v.optional(v.string()),
  role: v.optional(v.string()),
  subjects: v.optional(v.array(v.string())),
})
  .index("by_userId", ["userId"])
  .index("by_username", ["username"]),
```

#### Indexes
- `by_userId` - Fast lookup of profile by user ID
- `by_username` - Fast lookup of profile by username

---

## Input/Output Types

### Profile Object
```typescript
interface Profile {
  _id: Id<"profiles">;
  userId: Id<"users">;
  displayName: string;
  username: string;
  avatarUrl: string | null;
  bio: string;
  role: string | null;
  subjects: string[];
  _creationTime: number;
}
```

### Update Profile Args
```typescript
interface UpdateProfileArgs {
  displayName?: string;
  bio?: string;
  subjects?: string[];  // Array of strings
  avatarId?: Id<"_storage">;
}
```

### User Context Object
```typescript
interface User {
  name: string;
  email?: string;
  coursesPurchased: string[];
  avatarUrl?: string;
}
```

---

## Error Handling

### Common Errors

```typescript
// Not authenticated
try {
  await updateProfile({ displayName: "New Name" });
} catch (error) {
  if (error.message === "Not authenticated") {
    // User not logged in
  }
}

// Profile not found
try {
  const profile = await getByUsername({ username: "invalid" });
  if (!profile) {
    // Profile doesn't exist
  }
} catch (error) {
  // Handle error
}

// Unauthorized edit
try {
  await updateProfile({ displayName: "Hacker" }); // on someone else's profile
} catch (error) {
  if (error.message.includes("Unauthorized")) {
    // Can't edit other user's profile
  }
}

// Invalid subjects array
try {
  await updateProfile({
    subjects: "invalid"  // Wrong: should be array
  });
} catch (error) {
  if (error.message === "Subjects must be an array") {
    // Must provide array of strings
  }
}
```

---

## Usage Examples

### Example 1: Display Profile Card

```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ProfileCard({ username }: { username: string }) {
  const profile = useQuery(api.users.getByUsername, { username });

  if (!profile) return <div>Not found</div>;

  return (
    <div>
      <h2>{profile.displayName}</h2>
      <p>@{profile.username}</p>
      <p>{profile.bio}</p>
      {profile.subjects?.map(s => <span key={s}>{s}</span>)}
    </div>
  );
}
```

### Example 2: Edit Profile Form

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function EditProfile() {
  const updateProfile = useMutation(api.users.updateProfile);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [subjects, setSubjects] = useState("");

  const handleSave = async () => {
    await updateProfile({
      displayName,
      bio,
      subjects: subjects.split(",").map(s => s.trim()),
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />
      <input
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
        placeholder="Subject1, Subject2, Subject3"
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Example 3: Upload Avatar

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function UploadAvatar() {
  const generateUploadUrl = useMutation(api.users.generateUploadUrl);
  const updateProfile = useMutation(api.users.updateProfile);

  const handleUpload = async (file: File) => {
    // Get upload URL
    const uploadUrl = await generateUploadUrl();

    // Upload file
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const { storageId } = await response.json();

    // Update profile with new avatar
    await updateProfile({ avatarId: storageId });
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
    />
  );
}
```

---

## Field Validation

### displayName
- Type: `string`
- Required: Yes
- Min length: 1 character
- Max length: 255 characters
- Notes: Auto-generated from email if not provided

### username
- Type: `string`
- Required: Auto-generated if not provided
- Format: `firstname.lastname-4chars`
- Unique: Yes (per user)
- Example: `john.doe-1a2b`

### bio
- Type: `string`
- Required: No
- Max length: No limit (but keep < 500 chars for UI)
- Default: Empty string

### subjects
- Type: `string[]`
- Required: No
- Item type: String
- Max items: No limit (recommend < 10 for UI)
- Example: `["React", "TypeScript", "Node.js"]`

### avatarId
- Type: `Id<"_storage">`
- Required: No
- Format: Storage ID from Convex upload
- Related: `avatarUrl` is auto-resolved from this

### role
- Type: `string`
- Required: No
- Example: `"Student"`, `"Instructor"`, `"Admin"`

---

## Performance Tips

1. **Use Indexes**: Queries use `by_userId` and `by_username` indexes ✅
2. **Cache Queries**: Convex client automatically caches with `useQuery`
3. **Batch Users**: Load multiple profiles with Promise.all
4. **Optimize Renders**: Use memo for profile cards
5. **Debounce Updates**: Wait before saving to avoid too many mutations

---

## Security Notes

✅ All mutations require authentication
✅ updateProfile verifies user owns the profile
✅ Avatar IDs are resolved at query time (not stored as URLs)
✅ No sensitive data in error messages
✅ Database queries use server-side validation
✅ TypeScript prevents invalid argument types

---

## Limits & Quotas

- ✅ No per-user limits on profiles
- ✅ No storage limits (depends on Convex plan)
- ✅ No rate limiting (applies globally)
- ✅ Database size: Unlimited (with Convex)

---

Last Updated: February 28, 2026
Profile System v1.0
