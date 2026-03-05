# 🚀 Quick Start Guide - Profile System

## ⚡ 5-Minute Setup

### Step 1: Start Development Server
```bash
cd d:\eduv
npm run dev
# or
pnpm dev
```

### Step 2: Sign Up / Log In
- Open browser to `http://localhost:3000`
- Create a new account or log in
- Note your username (format: `firstname.lastname-xxxx`)

### Step 3: View Your Profile
- Navigate to: `/u/[your-username]`
- Example: `http://localhost:3000/u/john.doe-1a2b`
- **tada!** Your Academic Portfolio is live! 🎉

### Step 4: Edit Your Profile
1. Click **"Edit Portfolio"** button (blue button in hero section)
2. Update your information:
   - **Display Name**: Your full name
   - **Bio**: About yourself (e.g., "Full-stack developer, Education enthusiast")
   - **Interests/Subjects**: Comma-separated list
     - Example: `React, TypeScript, Korean Language, Business Development`
3. Click **"Save Changes"**
4. Changes appear instantly! ✨

---

## 📂 What Was Created

### Backend Files
```
convex/
├── profiles.ts          ← NEW: Reference profile module
└── users.ts             ← MODIFIED: Added updateProfile mutation
```

### Frontend Files
```
app/
└── u/
    └── [username]/
        └── page.tsx     ← NEW: Profile portfolio page
```

### Documentation Files
```
├── PROFILE_SYSTEM_GUIDE.md      ← Detailed guide (read this!)
├── PROFILE_SYSTEM_EXAMPLES.tsx  ← Code examples & patterns
└── IMPLEMENTATION_COMPLETE.md   ← This is what you're reading
```

---

## 🎯 Key Features

### View-Only (Any visitor)
- ✓ See profile avatar, name, username
- ✓ Read bio
- ✓ View interests/subjects as badges
- ✓ See student projects placeholder
- ✓ View activity timeline placeholder

### Edit Mode (Profile owner only)
- ✓ Edit display name
- ✓ Edit bio
- ✓ Edit interests/subjects
- ✓ Real-time validation
- ✓ Instant save & display

---

## 🔗 URLs to Try

```
Your Profile:            /u/[your-username]
Another User:            /u/john.doe-1a2b
Admin Profile:           /u/admin-xyz123
Homepage:                /
```

---

## ⚠️ Important Notes

### Username Format
```
Generated automatically: `firstname.lastname-4characters`

Examples:
✓ john.doe-1a2b
✓ jane.smith-5c3d
✓ alex.lee-7e9f
```

### Subjects Input Format
```
CORRECT:  React, TypeScript, DevOps
WRONG:    [React, TypeScript]
WRONG:    React; TypeScript
```

### Who Can Edit?
```
✓ Profile Owner: Can edit their own profile
✗ Other Users: Cannot edit (no button shown)
✗ Unauthorized Access: Will get error
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Profile not found | Check URL username spelling |
| Edit button not visible | Make sure you're viewing YOUR profile |
| Cannot save changes | Check browser console for errors |
| Subjects not saving | Use comma-separated format, no brackets |
| Avatar not showing | Try uploading again (PNG/JPG) |
| Page shows 404 | Make sure dev server is running |

---

## 💡 Pro Tips

1. **Multiple Subjects**: Separate by comma and space
   ```
   Web Development, Korean Language, Business
   ```

2. **Bio Ideas**: 
   ```
   Full-stack developer passionate about EdTech and Korean culture
   ```

3. **Visit Others' Profiles**: 
   - No edit button? That's expected—you can only edit your own!
   - Perfect for seeing how other students present themselves

4. **Mobile Friendly**:
   - Fully responsive design
   - All features work on mobile

---

## 📚 Full Documentation

For comprehensive details, read:
- **`PROFILE_SYSTEM_GUIDE.md`** - Architecture & API reference
- **`PROFILE_SYSTEM_EXAMPLES.tsx`** - Integration examples
- **`IMPLEMENTATION_COMPLETE.md`** - Complete overview

---

## 🎨 Layout Preview

```
┌─────────────────────────────────────┐
│        HERO SECTION                 │
│  ⭕ (avatar)                        │
│  John Doe                           │
│  @john.doe-1a2b                     │
│  Role: Student Developer            │
│  [Edit Portfolio Button]            │
└─────────────────────────────────────┘

┌──────────────┬──────────────────────┐
│  SIDEBAR     │   MAIN CONTENT       │
│              │                      │
│  About Me    │  Student Projects    │
│  Your bio    │  [Grid of 4]      │
│  here...     │                      │
│              │  Activity &          │
│  Interests   │  Achievements        │
│  🏷️ React    │  [Timeline]       │
│  🏷️ Node.js  │                      │
│  🏷️ TypeScript│                      │
└──────────────┴──────────────────────┘
```

---

## ✅ Verification Checklist

After setup, verify these work:

- [ ] Start dev server without errors
- [ ] Create account successfully
- [ ] Navigate to `/u/[username]`
- [ ] Profile page loads with your data
- [ ] Click "Edit Portfolio" button
- [ ] Dialog opens with form fields
- [ ] Edit display name
- [ ] Edit bio
- [ ] Enter subjects (comma-separated)
- [ ] Click "Save Changes"
- [ ] Dialog closes
- [ ] Page shows updated info immediately
- [ ] Visit another user's profile
- [ ] "Edit Portfolio" button NOT visible
- [ ] Avatar displays correctly (if uploaded)
- [ ] Mobile view works correctly

---

## 🆘 Need Help?

1. **Check the Guide**: Read `PROFILE_SYSTEM_GUIDE.md`
2. **See Examples**: Check `PROFILE_SYSTEM_EXAMPLES.tsx`
3. **Browser Console**: Look for error messages (F12)
4. **Dev Server Logs**: Check terminal for API errors
5. **Check Database**: Verify profile data in Convex dashboard

---

## 🎉 You're All Set!

Your profile system is ready to use. Start the dev server and enjoy your new Academic Portfolio!

```
npm run dev
# Navigate to http://localhost:3000/u/[your-username]
# Enjoy! 🚀
```

---

## 📖 Next Steps

1. **Test Profile Creation**
   - Create account
   - Visit profile page
   - Edit profile info

2. **Explore Layout**
   - Check responsive design on mobile
   - See how badges look
   - Review projects placeholder

3. **Add Projects** (Future)
   - Next feature to implement
   - Create project CRUD
   - Add project images

4. **Customize** (Optional)
   - Add profile themes
   - Customize colors
   - Add more sections

---

Last Updated: February 28, 2026
Profile System v1.0 - Complete & Ready
