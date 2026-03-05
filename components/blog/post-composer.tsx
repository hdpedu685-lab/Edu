"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ImagePlus, Video, Paperclip, Send, X, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostComposerProps {
  userName: string
  onPost: (data: { content: string; media_url?: string; media_type?: "image" | "video" }) => void | Promise<void>
  isPosting?: boolean
}

export function PostComposer({ userName, onPost, isPosting = false }: PostComposerProps) {
  const [content, setContent] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [mediaUrl, setMediaUrl] = useState("")
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null)
  const [showMediaInput, setShowMediaInput] = useState<"image" | "video" | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const handleInput = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = "auto"
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`
    }
  }

  const handleSubmit = () => {
    if (!content.trim()) return
    onPost({
      content: content.trim(),
      media_url: mediaUrl || undefined,
      media_type: mediaType || undefined,
    })
    setContent("")
    setMediaUrl("")
    setMediaType(null)
    setShowMediaInput(null)
    setShowPreview(false)
    setIsFocused(false)
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  const handleMediaButton = (type: "image" | "video") => {
    if (showMediaInput === type) {
      setShowMediaInput(null)
    } else {
      setShowMediaInput(type)
      setIsFocused(true)
    }
  }

  const applyMedia = (url: string) => {
    setMediaUrl(url)
    setMediaType(showMediaInput)
    setShowPreview(true)
    setShowMediaInput(null)
  }

  const clearMedia = () => {
    setMediaUrl("")
    setMediaType(null)
    setShowPreview(false)
  }

  const hasContent = content.trim().length > 0 || !!mediaUrl

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 shrink-0 border-2 border-slate-100">
            <AvatarFallback className="bg-[#A62A26] text-sm font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onInput={handleInput}
              onFocus={() => setIsFocused(true)}
              placeholder="Share something with the community..."
              rows={1}
              className={cn(
                "w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200",
                "focus:border-[#A62A26]/30 focus:bg-white focus:ring-2 focus:ring-[#A62A26]/10",
                isFocused && "min-h-[80px]"
              )}
            />

            {/* Media URL Input */}
            {showMediaInput && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="url"
                  placeholder={showMediaInput === "image" ? "Paste image URL..." : "Paste video URL (YouTube, etc.)..."}
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#A62A26]/30 focus:ring-2 focus:ring-[#A62A26]/10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                      applyMedia((e.target as HTMLInputElement).value.trim())
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowMediaInput(null)}
                  className="h-8 bg-transparent px-2 text-slate-400"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {/* Media Preview */}
            {mediaUrl && showPreview && (
              <div className="relative mt-3 overflow-hidden rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={clearMedia}
                  className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                {mediaType === "image" ? (
                  <div className="relative aspect-video bg-slate-100">
                    <Image
                      src={mediaUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={() => clearMedia()}
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-slate-900">
                    <div className="text-center">
                      <Video className="mx-auto h-8 w-8 text-slate-400" />
                      <p className="mt-1 text-xs text-slate-400 px-4 truncate max-w-[280px]">
                        {mediaUrl}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div
              className={cn(
                "flex items-center justify-between pt-3 transition-all duration-200",
                isFocused
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none h-0 -translate-y-2 overflow-hidden opacity-0"
              )}
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMediaButton("image")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    showMediaInput === "image"
                      ? "bg-[#A62A26]/10 text-[#A62A26]"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  )}
                >
                  <ImagePlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMediaButton("video")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    showMediaInput === "video"
                      ? "bg-[#A62A26]/10 text-[#A62A26]"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  )}
                >
                  <Video className="h-4 w-4" />
                  <span className="hidden sm:inline">Video</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="hidden sm:inline">File</span>
                </button>

                {/* Preview Toggle */}
                {mediaUrl && (
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="hidden sm:inline">{showPreview ? "Hide" : "Preview"}</span>
                  </button>
                )}
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!hasContent || isPosting}
                size="sm"
                className="gap-1.5 bg-[#A62A26] text-white hover:bg-[#8B2220] disabled:opacity-40"
              >
                {isPosting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
