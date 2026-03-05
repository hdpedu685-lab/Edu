"use client"

import { motion } from "framer-motion"
import { Play, Lock, CheckCircle2, Clock } from "lucide-react"
import { Course, Lesson } from "@/lib/types"
import { useUser } from "@/lib/user-context"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CurriculumSidebarProps {
  course: Course
  currentLesson: Lesson
  onSelectLesson: (lesson: Lesson) => void
}

export function CurriculumSidebar({
  course,
  currentLesson,
  onSelectLesson,
}: CurriculumSidebarProps) {
  const { user } = useUser()

  // FIX: Added safety guard and Type Assertion to fix the error in image_f28cdb.png
  const isLessonAccessible = (lesson: Lesson) => {
    if (!lesson.isPremium) return true;
    
    // This check prevents the "undefined" crash from image_f297e5.png
    if (!user) return false;

    // We cast to 'any' temporarily to stop the red lines in VS Code if your 
    // Typescript interface hasn't updated yet.
    const unlockedIds = (user as any).unlockedLessonIds || [];
    return unlockedIds.includes(lesson.id);
  }

  const getModuleProgress = (moduleId: string) => {
    const module = course.modules.find((m) => m.id === moduleId)
    if (!module) return { completed: 0, total: 0 }
    const completed = module.lessons.filter((l) => l.completed).length
    return { completed, total: module.lessons.length }
  }

  return (
    <div className="flex h-full flex-col border-l border-border bg-card">
      {/* Header - Styled with HDP Red Wine theme */}
      <div className="border-b border-border p-4 bg-primary/5">
        <h2 className="font-bold text-foreground">Course Content</h2>
        <p className="mt-1 text-[10px] text-primary uppercase font-bold tracking-widest">
          {course.modules.length} Modules Total
        </p>
      </div>

      <ScrollArea className="flex-1">
        <Accordion
          type="multiple"
          defaultValue={course.modules.map((m) => m.id)}
          className="w-full"
        >
          {course.modules.map((module, moduleIndex) => {
            const progress = getModuleProgress(module.id)
            return (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="border-b border-border"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-primary/5 transition-all">
                  <div className="flex flex-col items-start gap-1 text-left">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      Module {moduleIndex + 1}
                    </span>
                    <span className="font-semibold text-foreground leading-tight">
                      {module.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 w-16 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-0">
                  <ul className="divide-y divide-border/50">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isActive = currentLesson.id === lesson.id
                      const isAccessible = isLessonAccessible(lesson)
                      const isLocked = lesson.isPremium && !isAccessible

                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => !isLocked && onSelectLesson(lesson)}
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-3 text-left transition-all",
                              isActive ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-secondary/40",
                              isLocked && "opacity-60 cursor-not-allowed"
                            )}
                          >
                            {/* Icon Logic */}
                            <div className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                              lesson.completed ? "bg-green-500/10 border-green-500/20 text-green-600" :
                              isLocked ? "bg-muted border-border text-muted-foreground" :
                              isActive ? "bg-primary border-primary text-white" : "bg-background border-border"
                            )}>
                              {lesson.completed ? <CheckCircle2 className="h-3.5 w-3.5" /> :
                               isLocked ? <Lock className="h-3.5 w-3.5" /> :
                               <Play className={cn("h-3 w-3", isActive ? "fill-white" : "fill-primary")} />}
                            </div>

                            {/* Lesson Title */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className={cn(
                                  "truncate text-sm font-medium",
                                  isActive ? "text-primary font-bold" : "text-foreground"
                                )}>
                                  {lessonIndex + 1}. {lesson.title}
                                </span>
                                {lesson.isPremium && (
                                  <Badge variant="outline" className="h-4 px-1 text-[9px] border-primary/30 text-primary">
                                    PRO
                                  </Badge>
                                )}
                              </div>
                              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                              </div>
                            </div>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </ScrollArea>
    </div>
  )
}
