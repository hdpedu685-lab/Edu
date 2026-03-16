"use client";

import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/lib/user-context";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PostComposer } from "@/components/blog/post-composer";
import { PostCard } from "@/components/blog/post-card";
import type { BlogAuthor, BlogPost } from "@/lib/blog-data";
import { motion } from "framer-motion";
import { Edit2, Briefcase, BookOpen, Award, Camera, Newspaper, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function normalizeRole(role?: string): BlogAuthor["role"] {
  const normalized = (role || "").toLowerCase();
  if (normalized === "expert" || normalized === "educator") return "Educator";
  if (normalized === "admin") return "Admin";
  return "Student";
}

function convexPostToBlogPost(post: any): BlogPost {
  const author: BlogAuthor = {
    id: post.userId,
    name: post.author?.name || "User",
    username: post.author?.username || "user",
    avatarUrl: post.author?.avatarUrl || "",
    role: normalizeRole(post.author?.role),
    bio: post.author?.bio || "",
    subjects: post.author?.subjects || [],
    followers: 0,
  };

  return {
    id: post._id,
    user_id: post.userId,
    content: post.content,
    media_url: post.mediaUrl,
    media_type: post.mediaType || null,
    created_at: new Date(post._creationTime).toISOString(),
    author,
    likes: post.likeCount || 0,
    comments: (post.comments || []).map((comment: any) => ({
      id: comment._id,
      content: comment.content,
      timestamp: new Date(comment._creationTime).toLocaleString(),
      likes: comment.likes || 0,
      author: {
        id: comment.userId,
        name: comment.author?.name || "User",
        username: comment.author?.username || "user",
        avatarUrl: comment.author?.avatarUrl || "",
        role: normalizeRole(comment.author?.role),
        bio: comment.author?.bio || "",
        subjects: comment.author?.subjects || [],
        followers: 0,
      },
    })),
    shares: post.shareCount || 0,
    liked: post.liked || false,
  };
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, isAuthenticated, isLoading: authLoading } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isProcessingCoverCrop, setIsProcessingCoverCrop] = useState(false);
  const [coverCropOpen, setCoverCropOpen] = useState(false);
  const [coverDraftUrl, setCoverDraftUrl] = useState<string>("");
  const [coverZoom, setCoverZoom] = useState(1);
  const [coverOffsetX, setCoverOffsetX] = useState(0);
  const [coverOffsetY, setCoverOffsetY] = useState(0);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    subjects: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const [selectedBackground, setSelectedBackground] = useState<string>("");

  const generateUploadUrl = useMutation(api.users.generateUploadUrl);
  const resolveStorageUrl = useMutation(api.users.resolveStorageUrl);
  const createPostMutation = useMutation(api.posts.create);
  const toggleLikeMutation = useMutation(api.posts.toggleLike);
  const addCommentMutation = useMutation(api.posts.addComment);
  const username = (params?.username as string) || "";

  // Only query the profile when we have a valid username
  // Skip the query entirely until we're ready to avoid premature "not found" states
  const profile = useQuery(
    api.profiles.getByUsername,
    username ? { username } : "skip"
  );
  const currentProfile = useQuery(api.profiles.getCurrentUserProfile, {});
  const profilePostsRaw = useQuery(
    api.posts.listByUsername,
    username ? { username } : "skip"
  );
  
  // Determine if we're in a loading state
  // Show loading spinner while auth is loading or profile query is pending
  const isLoading = authLoading || profile === undefined;
  const updateProfileMutation = useMutation(api.profiles.updateProfile);

  const isOwnProfile =
    isAuthenticated &&
    currentProfile &&
    profile &&
    currentProfile.userId === profile.userId;

  const shouldLoadBackgrounds = Boolean(isAuthenticated && isOwnProfile && editOpen);
  const availableBackgrounds = useQuery(
    api.backgrounds.getAvailableBackgrounds,
    shouldLoadBackgrounds ? {} : "skip"
  );

  // Initialize form data with profile data whenever profile changes
  // This ensures the form always reflects the latest database state
  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        bio: profile.bio || "",
        subjects: (profile.subjects || []).join(", "),
      });
      setAvatarPreview(profile.avatarUrl || undefined);
      setSelectedBackground((profile as any).backgroundImage || "");
      // Only clear avatar file if dialog is being opened fresh
      if (editOpen) {
        setAvatarFile(null);
      }
    }
  }, [profile]);

  // Clear avatar file when dialog opens/closes
  useEffect(() => {
    if (editOpen) {
      setAvatarFile(null);
      setSelectedBackground(((profile as any)?.backgroundImage as string) || "");
    }
  }, [editOpen, profile]);

  useEffect(() => {
    return () => {
      if (coverDraftUrl) {
        URL.revokeObjectURL(coverDraftUrl);
      }
    };
  }, [coverDraftUrl]);

  const handleUpdateProfile = async () => {
    if (!profile) {
      console.error('update called but profile missing');
      toast.error('Cannot save: profile not loaded');
      return;
    }
    
    // Validate displayName is not empty
    if (!formData.displayName.trim()) {
      toast.error('Display name cannot be empty');
      return;
    }

    setIsSaving(true);
    console.log('=== PROFILE UPDATE START ===');
    console.log('Form Data:', formData);
    console.log('Avatar File:', avatarFile);
    console.log('Current Profile:', profile);
    
    try {
      const subjectsArray = formData.subjects
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      let avatarId: string | undefined;
      if (avatarFile) {
        try {
          console.log("Starting avatar upload...");
          const uploadUrl = await generateUploadUrl();
          console.log("Got upload url:", uploadUrl);
          
          const resp = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": avatarFile.type },
            body: avatarFile,
          });
          
          console.log("Upload response status:", resp.status);
          if (!resp.ok) throw new Error("Avatar upload failed: " + resp.status);
          
          const json = await resp.json();
          console.log("Upload JSON response:", json);
          avatarId = json.storageId;
        } catch (e) {
          console.error("Avatar upload error, proceeding without avatar", e);
          // do not block the profile update
        }
      }

      console.log("Calling updateProfileMutation with:", {
        displayName: formData.displayName.trim(),
        bio: formData.bio.trim(),
        subjects: subjectsArray,
        avatarId,
        backgroundImage: selectedBackground,
      });

      // Await the mutation to ensure it completes before proceeding
      const result = await updateProfileMutation({
        displayName: formData.displayName.trim() || undefined,
        bio: formData.bio.trim() || undefined,
        subjects: subjectsArray.length > 0 ? subjectsArray : undefined,
        avatarId: avatarId ? (avatarId as any) : undefined,
        backgroundImage: selectedBackground || undefined,
      });
      
      console.log("Mutation result received:", result);

      if (!result) {
        throw new Error("Mutation returned no result");
      }

      console.log("Profile update successful!");
      
      // Show success toast message to confirm database acknowledged the change
      toast.success("Profile Updated");
      
      // Immediately close dialog and reset form
      setEditOpen(false);
      setFormData({ displayName: "", bio: "", subjects: "" });
      setAvatarFile(null);
      setAvatarPreview(undefined);
      setSelectedBackground("");
      
      // Force Next.js to clear server-side cache and show latest data
      router.refresh();
      
      console.log("=== PROFILE UPDATE COMPLETE ===");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      console.error("Error details:", {
        message: error?.message,
        stack: error?.stack,
        fullError: error,
      });
      toast.error("Failed to update profile: " + (error?.message || JSON.stringify(error)));
    } finally {
      setIsSaving(false);
    }
  };

  const resetCoverCrop = () => {
    if (coverDraftUrl) {
      URL.revokeObjectURL(coverDraftUrl);
    }
    setCoverDraftUrl("");
    setCoverZoom(1);
    setCoverOffsetX(0);
    setCoverOffsetY(0);
    setCoverCropOpen(false);
  };

  const handleStartCoverCrop = (file: File) => {
    if (!isOwnProfile) return;
    if (coverDraftUrl) {
      URL.revokeObjectURL(coverDraftUrl);
    }
    const draftUrl = URL.createObjectURL(file);
    setCoverDraftUrl(draftUrl);
    setCoverZoom(1);
    setCoverOffsetX(0);
    setCoverOffsetY(0);
    setCoverCropOpen(true);
  };

  const uploadCoverBlob = async (file: Blob) => {
    if (!isOwnProfile) return;
    try {
      const uploadUrl = await generateUploadUrl();
      const resp = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type || "image/jpeg" },
        body: file,
      });
      if (!resp.ok) throw new Error(`Cover upload failed: ${resp.status}`);
      const json = await resp.json();
      const coverUrl = await resolveStorageUrl({ storageId: json.storageId });
      if (!coverUrl) throw new Error("Failed to resolve uploaded cover URL");

      await updateProfileMutation({ coverImage: coverUrl });
      toast.success("Cover photo updated");
      router.refresh();
    } catch (error: any) {
      console.error("Failed to upload cover photo:", error);
      toast.error("Failed to upload cover photo: " + (error?.message || "Unknown error"));
    }
  };

  const handleApplyCoverCrop = async () => {
    if (!coverDraftUrl) return;

    setIsProcessingCoverCrop(true);
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load selected image"));
        img.src = coverDraftUrl;
      });

      const coverWidth = 1500;
      const coverHeight = 390;
      const canvas = document.createElement("canvas");
      canvas.width = coverWidth;
      canvas.height = coverHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Unable to initialize crop canvas");

      const baseScale = Math.max(
        coverWidth / image.naturalWidth,
        coverHeight / image.naturalHeight
      );
      const finalScale = baseScale * coverZoom;
      const drawWidth = image.naturalWidth * finalScale;
      const drawHeight = image.naturalHeight * finalScale;
      const drawX = (coverWidth - drawWidth) / 2 + coverOffsetX;
      const drawY = (coverHeight - drawHeight) / 2 + coverOffsetY;

      ctx.clearRect(0, 0, coverWidth, coverHeight);
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

      const croppedBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.92);
      });

      if (!croppedBlob) throw new Error("Failed to generate cropped image");

      setIsUploadingCover(true);
      await uploadCoverBlob(croppedBlob);
      resetCoverCrop();
    } catch (error: any) {
      console.error("Failed to apply cover crop:", error);
      toast.error("Failed to crop cover image: " + (error?.message || "Unknown error"));
    } finally {
      setIsProcessingCoverCrop(false);
      setIsUploadingCover(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Loading Profile</h2>
          <p className="text-slate-500 dark:text-slate-400">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Profile Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">The profile does not exist.</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const profilePosts: BlogPost[] = (profilePostsRaw || []).map((post: any) =>
    convexPostToBlogPost(post)
  );

  const handleCreatePost = async (data: {
    content: string;
    media_url?: string;
    media_type?: "image" | "video";
  }) => {
    setIsPosting(true);
    setFeedError(null);
    try {
      await createPostMutation({
        content: data.content,
        mediaUrl: data.media_url,
        mediaType: data.media_type,
      });
    } catch (error) {
      setFeedError(error instanceof Error ? error.message : "Failed to create post");
      toast.error("Could not create post");
    } finally {
      setIsPosting(false);
    }
  };

  const handleLikePost = async (postId: string) => {
    setFeedError(null);
    try {
      await toggleLikeMutation({ postId: postId as any });
    } catch (error) {
      setFeedError(error instanceof Error ? error.message : "Failed to like post");
    }
  };

  const handleCommentPost = async (postId: string, content: string) => {
    setFeedError(null);
    try {
      await addCommentMutation({
        postId: postId as any,
        content,
      });
    } catch (error) {
      setFeedError(error instanceof Error ? error.message : "Failed to comment");
      throw error;
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden ${
        (profile as any).backgroundImage
          ? "bg-transparent"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      }`}
    >
      {(profile as any).backgroundImage ? (
        <div
          className="fixed inset-0 z-0 bg-cover bg-fixed bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${(profile as any).backgroundImage})` }}
        />
      ) : null}
      <div className={`fixed inset-0 z-0 ${(profile as any).backgroundImage ? "bg-white/35 dark:bg-slate-950/45" : "bg-white/40 dark:bg-slate-900/75"}`} />

      {/* Facebook-style cover banner */}
      <div className="relative z-10 h-[390px] overflow-hidden">
        {(profile as any).coverImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${(profile as any).coverImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Profile Header */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-20 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <Avatar className="h-40 w-40 ring-4 ring-slate-800 border-4 border-white shadow-2xl flex-shrink-0">
              <AvatarImage src={profile?.avatarUrl || undefined} alt={profile.displayName} />
              <AvatarFallback className="text-5xl bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                {profile.displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{profile.displayName}</h1>
              <p className="text-lg text-indigo-300 mb-4">@{profile.username}</p>
              {profile.role && (
                <Badge className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">
                  <Briefcase className="w-3 h-3 mr-2" />
                  {profile.role}
                </Badge>
              )}
            </div>

            {isOwnProfile && (
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white whitespace-nowrap">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-slate-100 border border-slate-200 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 shadow-2xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader className="border-b border-slate-200 dark:border-slate-700 pb-4">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      Edit Your Professional Profile
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400 mt-1">
                      Customize your profile and showcase your professional presence
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-6 px-4">
                    {/* Avatar Upload Section */}
                    <div className="bg-gradient-to-br from-white/80 to-slate-100/70 dark:from-slate-800/50 dark:to-slate-700/30 rounded-xl p-6 border border-slate-200 dark:border-slate-600/50 backdrop-blur">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-28 w-28 ring-4 ring-indigo-500/30 border-2 border-indigo-400">
                            {avatarPreview ? (
                              <AvatarImage src={avatarPreview ?? undefined} alt="Avatar preview" />
                            ) : (
                              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-2xl font-bold text-white">
                                {profile.displayName[0] || "?"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 shadow-lg">
                            <Edit2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="text-center">
                          <Label htmlFor="avatar" className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mb-3">
                            Profile Photo
                          </Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">JPG, PNG or GIF (Max 5MB)</p>
                          <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setAvatarFile(file);
                              if (file) {
                                setAvatarPreview(URL.createObjectURL(file));
                              } else {
                                setAvatarPreview(profile.avatarUrl || undefined);
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => document.getElementById("avatar")?.click()}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full"
                          >
                            Choose Photo
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Cover Upload Section */}
                    <div className="bg-gradient-to-br from-white/80 to-slate-100/70 dark:from-slate-800/50 dark:to-slate-700/30 rounded-xl p-6 border border-slate-200 dark:border-slate-600/50 backdrop-blur">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mb-3">
                        Cover Photo
                      </Label>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">JPG, PNG or GIF (Max 5MB)</p>
                      <div className="relative h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 mb-4">
                        {(profile as any).coverImage ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${(profile as any).coverImage})` }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
                        )}
                        <div className="absolute inset-0 bg-black/30" />
                      </div>
                      <input
                        id="cover-upload-dialog"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleStartCoverCrop(file);
                          }
                          e.currentTarget.value = "";
                        }}
                      />
                      <Button
                        type="button"
                        disabled={isUploadingCover || isProcessingCoverCrop}
                        onClick={() => document.getElementById("cover-upload-dialog")?.click()}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {isUploadingCover || isProcessingCoverCrop ? "Uploading..." : "Upload cover photo"}
                      </Button>
                    </div>

                    {/* Form Fields Section */}
                    <div className="space-y-4">
                      <div className="bg-white/70 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-600/30">
                        <Label htmlFor="displayName" className="text-sm font-semibold text-slate-700 dark:text-slate-100 block mb-2">
                          Display Name
                        </Label>
                        <Input
                          id="displayName"
                          value={formData.displayName}
                          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                          placeholder="Enter your full name"
                          className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/50"
                        />
                      </div>

                      <div className="bg-white/70 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-600/30">
                        <Label htmlFor="bio" className="text-sm font-semibold text-slate-700 dark:text-slate-100 block mb-2">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          placeholder="Write a brief bio about yourself and your professional background..."
                          rows={3}
                          className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/50 resize-none"
                        />
                      </div>

                      <div className="bg-white/70 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-600/30">
                        <Label htmlFor="subjects" className="text-sm font-semibold text-slate-700 dark:text-slate-100 block mb-2">
                          Interests & Skills
                        </Label>
                        <Textarea
                          id="subjects"
                          value={formData.subjects}
                          onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                          placeholder="e.g., Web Development, Korean Language, Business Strategy (comma-separated)"
                          rows={2}
                          className="bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/50 resize-none"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Separate multiple interests with commas</p>
                      </div>

                      <div className="bg-white/70 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-600/30">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-100 block mb-3">
                          Full Page Background
                        </Label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                          Select one of the available presets. It will apply to the whole page after you click Save Changes.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {(availableBackgrounds || []).map((bgPath) => {
                            const active = selectedBackground === bgPath;
                            return (
                              <button
                                key={bgPath}
                                type="button"
                                onClick={() => setSelectedBackground(bgPath)}
                                className={`relative overflow-hidden rounded-lg border-2 transition-all h-20 bg-slate-100 dark:bg-slate-700 ${
                                  active
                                    ? "border-indigo-400 ring-2 ring-indigo-400/60"
                                    : "border-slate-300 dark:border-slate-600 hover:border-indigo-300"
                                }`}
                                title={bgPath}
                              >
                                <div
                                  className="absolute inset-0 bg-cover bg-center"
                                  style={{ backgroundImage: `url(${bgPath})` }}
                                />
                                <div className={`absolute inset-0 ${active ? "bg-indigo-900/20" : "bg-black/25"}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex gap-3">
                    <Button
                      onClick={handleUpdateProfile}
                      disabled={isSaving}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditOpen(false)}
                      disabled={isSaving}
                      className="bg-white dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <Dialog open={coverCropOpen} onOpenChange={(open) => (!open ? resetCoverCrop() : setCoverCropOpen(true))}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-slate-100 border border-slate-200 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Adjust Cover Photo</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Use zoom and position sliders to crop your cover for the best display.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="relative h-52 md:h-64 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              {coverDraftUrl ? (
                <img
                  src={coverDraftUrl}
                  alt="Cover crop preview"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: `translate(${coverOffsetX}px, ${coverOffsetY}px) scale(${coverZoom})`,
                    transformOrigin: "center",
                  }}
                />
              ) : null}
              <div className="absolute inset-0 ring-2 ring-inset ring-indigo-400/60 pointer-events-none" />
            </div>

            <div className="grid gap-4">
              <div>
                <Label className="text-slate-700 dark:text-slate-200">Zoom</Label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={coverZoom}
                  onChange={(e) => setCoverZoom(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <Label className="text-slate-700 dark:text-slate-200">Horizontal Position</Label>
                <input
                  type="range"
                  min={-300}
                  max={300}
                  step={1}
                  value={coverOffsetX}
                  onChange={(e) => setCoverOffsetX(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <Label className="text-slate-700 dark:text-slate-200">Vertical Position</Label>
                <input
                  type="range"
                  min={-200}
                  max={200}
                  step={1}
                  value={coverOffsetY}
                  onChange={(e) => setCoverOffsetY(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                onClick={resetCoverCrop}
                disabled={isUploadingCover || isProcessingCoverCrop}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApplyCoverCrop}
                disabled={isUploadingCover || isProcessingCoverCrop || !coverDraftUrl}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isUploadingCover || isProcessingCoverCrop ? "Processing..." : "Apply & Upload"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <Card className="border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-800/70 shadow-lg backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Intro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{profile.bio || "No bio provided yet."}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600/60 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Posts</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{profilePosts.length}</p>
                  </div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600/60 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Role</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-2">{profile.role || "Student"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {profile.subjects && profile.subjects.length > 0 && (
              <Card className="border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-800/70 shadow-lg backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Award className="w-5 h-5 text-indigo-400" />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.subjects.map((subject: string, idx: number) => (
                      <Badge key={idx} className="bg-indigo-600/80 text-indigo-100 border-indigo-500/50">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-5">
            <Card className="border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-800/70 shadow-lg backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Newspaper className="w-5 h-5 text-indigo-400" />
                  {isOwnProfile ? "Your Timeline" : `${profile.displayName}'s Timeline`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isOwnProfile ? (
                  <PostComposer
                    userName={profile.displayName}
                    onPost={handleCreatePost}
                    isPosting={isPosting}
                  />
                ) : (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-100/80 dark:bg-slate-700/30 p-4 text-sm text-slate-700 dark:text-slate-300">
                    Only {profile.displayName} can publish posts on this profile.
                  </div>
                )}
              </CardContent>
            </Card>

            {feedError && (
              <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-200">
                {feedError}
              </div>
            )}

            {profilePosts.length === 0 ? (
              <Card className="border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-800/70 shadow-lg backdrop-blur">
                <CardContent className="py-12 text-center">
                  <Sparkles className="w-8 h-8 text-indigo-300 mx-auto mb-3" />
                  <p className="text-slate-900 dark:text-white font-semibold">No posts yet</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {isOwnProfile
                      ? "Create your first post to start your personal timeline."
                      : "This profile has not shared any posts yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              profilePosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onComment={handleCommentPost}
                />
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
