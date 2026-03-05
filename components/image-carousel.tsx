"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

const carouselImages = [
  {
    src: "/slider1.png",
    alt: {
      vi: "Slide 1",
      ko: "슬라이드 1"
    }
  },
  {
    src: "/slider2.png",
    alt: {
      vi: "Slide 2",
      ko: "슬라이드 2"
    }
  },
  {
    src: "/slider3.png",
    alt: {
      vi: "Slide 3",
      ko: "슬라이드 3"
    }
  },
  {
    src: "/slider4.png",
    alt: {
      vi: "Slide 4",
      ko: "슬라이드 4"
    }
  }
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { language } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
  }

  return (
    <section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(139, 46, 46, 0.2)' }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl" style={{ backgroundColor: 'rgba(69, 10, 10, 0.4)' }}>
          <div className="relative h-[400px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center p-8"
              >
                <Image
                  src={carouselImages[currentIndex].src || "/placeholder.svg"}
                  alt={carouselImages[currentIndex].alt[language]}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 pb-6">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-white w-8" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
