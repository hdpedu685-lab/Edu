"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, User, Clock, BarChart3, Award, BookOpen, Users, CheckCircle2, PlayCircle, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"
import { CurriculumSidebar } from "@/components/curriculum-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockCourse } from "@/lib/data"
import { useUser } from "@/lib/user-context"
import { useLanguage } from "@/lib/language-context"
import { Lesson } from "@/lib/types"

export default function ClassroomPage() {
  const { user } = useUser()
  const { language, t } = useLanguage()
  const [currentLesson, setCurrentLesson] = useState<Lesson>(
    mockCourse.modules[0].lessons[0]
  )

  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('classroom-dark')
    if (stored) setDarkMode(stored === '1')
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('classroom-dark', darkMode ? '1' : '0')
  }, [darkMode])

  const overlayBg = darkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'
  const borderColor = darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(166, 42, 38, 0.2)'
  // Dark-blue border used consistently for cards
  const cardBorderColor = '#0b3d91'
  const textColor = darkMode ? '#ffffff' : '#a62a26'
  const mutedTextColor = darkMode ? 'rgba(255,255,255,0.8)' : '#a62a26'

  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
  }

  const courseStats = [
    { icon: Clock, label: language === "vi" ? "Tổng Thời Lượng" : "전체 기간", value: "24 hours" },
    { icon: BookOpen, label: language === "vi" ? "Tổng Bài Học" : "전체 강의", value: mockCourse.modules.length },
    { icon: Users, label: language === "vi" ? "Học viên" : "학습자", value: "10K+" },
    { icon: BarChart3, label: language === "vi" ? "Độ Khó" : "난이도", value: mockCourse.level }
  ]

  return (
    <div
      className={`min-h-screen bg-cover bg-fixed bg-center bg-no-repeat transition-colors duration-300 ${darkMode ? 'classroom-dark' : ''}`}
      style={{
        backgroundImage: `url(/${darkMode ? 'dark-mode.png' : 'bg-course.png'})`,
        backgroundAttachment: 'fixed',
        color: darkMode ? '#ffffff' : undefined,
      }}
    >
      <style jsx global>{`
        /* Ensure all text is white inside the classroom when dark mode is active */
        .classroom-dark, .classroom-dark * {
          color: #ffffff !important;
        }
        /* Keep muted text slightly less bright but still white */
        .classroom-dark p, .classroom-dark span, .classroom-dark small { color: rgba(255,255,255,0.92) !important; }
      `}</style>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ borderColor: borderColor, backgroundColor: darkMode ? 'rgba(0,0,0,0.12)' : 'rgba(255, 255, 255, 0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className={undefined}>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" style={{ color: textColor }} />
              </Link>
            </Button>
            <div className="rounded-xl backdrop-blur-md border px-4 py-3" style={{ backgroundColor: overlayBg, borderColor: borderColor }}>
              <h1 className="font-bold" style={{ color: textColor }}>{mockCourse.title}</h1>
              <p className="text-sm" style={{ color: mutedTextColor }}>
                by {mockCourse.instructor}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode" className="relative z-50" type="button">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ backgroundColor: darkMode ? 'rgba(166, 42, 38, 0.06)' : 'rgba(166, 42, 38, 0.1)', border: `1px solid ${borderColor}` }}>
              <Award className="h-4 w-4" style={{ color: textColor }} />
              <span className="font-medium" style={{ color: textColor }}>{user.coursesPurchased.length} courses</span>
            </div>
            <div className="flex items-center gap-2 rounded-full px-3 py-2" style={{ backgroundColor: darkMode ? 'rgba(166, 42, 38, 0.06)' : 'rgba(166, 42, 38, 0.1)', border: `1px solid ${borderColor}` }}>
              <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: textColor, color: '#fff' }}>
                <User className="h-3 w-3" />
              </div>
              <span className="text-sm font-medium" style={{ color: textColor }}>{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video and Content Area */}
          <main className="lg:col-span-2">
            {/* Video Player with Rounded Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-2xl mb-8"
              style={{ backgroundColor: overlayBg, border: `1px solid ${cardBorderColor}` }}
            >
              <VideoPlayer lesson={currentLesson} />
            </motion.div>

            {/* Course Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-4 gap-4 mb-8"
            >
              {courseStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    className="rounded-xl p-4 text-center"
                    style={{ backgroundColor: overlayBg, border: `1px solid ${cardBorderColor}` }}
                  >
                    <IconComponent className="h-6 w-6 mx-auto mb-2" style={{ color: textColor }} />
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: mutedTextColor }}>{stat.label}</p>
                    <p className="text-lg font-bold mt-1" style={{ color: textColor }}>{stat.value}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Lesson Info */}
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Lesson Header */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: overlayBg, border: `1px solid ${cardBorderColor}` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h2 className="text-3xl font-bold" style={{ color: textColor }}>
                        {currentLesson.title}
                      </h2>
                      {currentLesson.isPremium && (
                        <Badge className="bg-[#a62a26] text-white hover:bg-[#8e2420]">Premium</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="flex items-center gap-2" style={{ color: mutedTextColor }}>
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{currentLesson.duration}</span>
                      </div>
                      <Badge variant="outline" className="border-[#a62a26] text-[#a62a26]">
                        {mockCourse.level}
                      </Badge>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white"
                    style={{ backgroundColor: '#a62a26' }}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Mark Complete
                  </motion.button>
                </div>
              </div>

              {/* Course Description */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: overlayBg, border: `1px solid ${cardBorderColor}` }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>About This Lesson</h3>
                <p className="leading-relaxed" style={{ color: mutedTextColor }}>
                  {mockCourse.description}
                </p>
              </div>

              {/* Learning Outcomes */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: overlayBg, border: `1px solid ${cardBorderColor}` }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: textColor }}>What You'll Learn</h3>
                <ul className="space-y-3">
                  {["Key concepts and terminology", "Practical applications", "Industry best practices", "Real-world examples"].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: textColor }} />
                      <span style={{ color: mutedTextColor }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </main>

          {/* Sidebar - Curriculum */}
          <aside className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl overflow-hidden sticky top-24 shadow-xl"
              style={{ backgroundColor: overlayBg, border: `1px solid ${cardBorderColor}` }}
            >
              <div className="p-6 border-b" style={{ borderColor: borderColor }}>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" style={{ color: textColor }} />
                  <h3 className="text-lg font-bold" style={{ color: textColor }}>Course Curriculum</h3>
                </div>
              </div>
              <CurriculumSidebar
                course={mockCourse}
                currentLesson={currentLesson}
                onSelectLesson={handleSelectLesson}
              />
            </motion.div>
          </aside>
        </div>
      </div>
      {/* Floating Dark/Light Toggle (placed next to the AI assistant button) */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-20 z-60 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-shadow"
        style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${borderColor}`, color: textColor }}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.button>
    </div>
  )
}
