"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, Users, Lightbulb, Globe, CheckCircle2, Briefcase, Sparkles, Zap, TrendingUp, Award, Rocket, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function AboutUsPage() {
  const { language } = useLanguage()

  const content = {
    hero: {
      vi: {
        title: "Về HDP EDU",
        subtitle: "Chuẩn Bị Sự Nghiệp Tại Hàn Quốc Cùng Chúng Tôi"
      },
      ko: {
        title: "HDP EDU에 대해",
        subtitle: "저희와 함께 한국 경력을 준비하세요"
      }
    },
    about: {
      vi: {
        section1Title: "Chúng Tôi Là Ai",
        section1Content: "HDP EDU là nền tảng học trực tuyến dành cho người Việt Nam mong muốn học tiếng Hàn, hiểu văn hóa Hàn Quốc và chuẩn bị kỹ năng làm việc trong môi trường doanh nghiệp Hàn Quốc.",
        section1Detail: "Chúng tôi xây dựng nội dung theo hướng thực tế, dễ hiểu và dễ áp dụng, phù hợp với người Việt có định hướng phát triển nghề nghiệp liên quan đến Hàn Quốc.",
        
        missionTitle: "Sứ Mệnh Của Chúng Tôi",
        missionContent: "Giúp người Việt rút ngắn khoảng cách ngôn ngữ và văn hóa khi làm việc trong môi trường Hàn Quốc thông qua các chương trình đào tạo bài bản và thực tiễn.",
        
        servicesTitle: "Chúng Tôi Cung Cấp",
        services: [
          "Tiếng Hàn ứng dụng cho công việc",
          "Văn hóa doanh nghiệp Hàn Quốc",
          "Kỹ năng làm việc trong môi trường Hàn",
          "Định hướng học tập và phát triển nghề nghiệp"
        ],

        targetTitle: "Đối Tượng Phù Hợp",
        targets: [
          "Người Việt đang học tiếng Hàn",
          "Sinh viên và người đi làm định hướng môi trường Hàn Quốc",
          "Người muốn hiểu văn hóa và tác phong làm việc của doanh nghiệp Hàn"
        ],

        activitiesTitle: "Hoạt Động Của Chúng Tôi",
        activitiesSubtitle: "Kết nối học tập – trải nghiệm – thực tế thông qua các hoạt động:",
        activities: [
          { title: "Lớp Học & Workshop", description: "Đào tạo chuyên sâu tiếng Hàn và kỹ năng doanh nghiệp" },
          { title: "Giao Lưu & Định Hướng", description: "Buổi giao lưu văn hóa và định hướng nghề nghiệp" },
          { title: "Kết Nối Doanh Nghiệp", description: "Hoạt động kết nối văn hóa và doanh nghiệp Hàn Quốc" },
          { title: "Hỗ Trợ Tuyển Dụng", description: "Tư vấn và hỗ trợ quá trình xin việc tại Hàn Quốc" }
        ]
      },
      ko: {
        section1Title: "우리는 누구인가",
        section1Content: "HDP EDU는 한국어를 배우고, 한국 문화를 이해하며, 한국 기업 환경에서 일할 준비를 하려는 베트남인을 위한 온라인 학습 플랫폼입니다.",
        section1Detail: "우리는 실용적이고 이해하기 쉬우며 적용하기 쉬운 콘텐츠를 만들어 한국과 관련된 경력 발전을 원하는 베트남인에게 맞춤 교육을 제공합니다.",
        
        missionTitle: "우리의 사명",
        missionContent: "체계적이고 실무적인 교육 프로그램을 통해 베트남인이 한국 기업 환경에서 일할 때 언어와 문화적 거리를 좁혀줍니다.",
        
        servicesTitle: "우리가 제공하는 것",
        services: [
          "업무용 한국어",
          "한국 기업 문화",
          "한국 업무 환경 기술",
          "학습 방향 및 경력 개발"
        ],

        targetTitle: "적합한 대상",
        targets: [
          "한국어를 배우고 있는 베트남인",
          "한국 업무 환경을 목표로 하는 학생 및 직장인",
          "한국 기업의 문화와 업무 태도를 이해하고 싶은 사람"
        ],

        activitiesTitle: "우리의 활동",
        activitiesSubtitle: "학습 – 경험 – 실무를 통해 학생들을 연결합니다:",
        activities: [
          { title: "수업 & 워크숍", description: "한국어 및 비즈니스 기술 심화 교육" },
          { title: "문화 교류", description: "문화 교류 및 경력 개발 지향 활동" },
          { title: "기업 연계", description: "한국 기업 문화 및 네트워킹 활동" },
          { title: "채용 지원", description: "한국 취업 과정 상담 및 지원" }
        ]
      }
    }
  }

  const t = (section: keyof typeof content): any => {
    return content[section][language as keyof typeof content[keyof typeof content]]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="min-h-screen">
      {/* Light mode background */}
      <div className="fixed inset-0 -z-10 bg-cover bg-fixed bg-center bg-no-repeat light" style={{ backgroundImage: 'url(/bg-course.png)' }} />
      {/* Dark mode background */}
      <div className="fixed inset-0 -z-10 bg-cover bg-fixed bg-center bg-no-repeat hidden dark:block" style={{ backgroundImage: 'url(/dark-mode.png)' }} />
      <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 border-b mt-16 light:bg-white/15 dark:bg-[#000814]/50" style={{ borderColor: 'rgba(139, 46, 46, 0.2)' }}>
        <div className="absolute inset-0 opacity-30">
          <motion.div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" animate={{ y: [0, 30, 0], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" animate={{ y: [0, -30, 0], x: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }} />
        </div>
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-[#a62a26] dark:text-white">
              {t("hero").title}
            </h1>
            <p className="text-xl md:text-2xl text-[#a62a26]/80 dark:text-white/80 max-w-3xl mx-auto">
              {t("hero").subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section 1 */}
      <section className="py-24 md:py-32 border-b" style={{ borderColor: 'rgba(139, 46, 46, 0.2)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#a62a26] dark:text-white">
                {t("about").section1Title}
              </h2>
              <p className="text-lg mb-4 text-[#a62a26]/80 dark:text-white/80 leading-relaxed">
                {t("about").section1Content}
              </p>
              <p className="text-base text-[#a62a26]/70 dark:text-white/70 leading-relaxed border-l-4 border-[#a62a26]/40 dark:border-white/40 pl-6">
                {t("about").section1Detail}
              </p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-xl border border-white/20" />
              <motion.div className="absolute inset-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10" animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 border-b" style={{ borderColor: 'rgba(139, 46, 46, 0.2)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#a62a26] dark:text-white">
              {t("about").missionTitle}
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative overflow-hidden rounded-3xl p-12 md:p-16 backdrop-blur-md border light:bg-white dark:bg-[#000814]/90" style={{ borderColor: 'rgba(166, 42, 38, 0.2)' }}>
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" animate={{ y: [0, 40, 0] }} transition={{ duration: 6, repeat: Infinity }} />
            <div className="relative z-10">
              <p className="text-xl text-[#a62a26]/90 dark:text-white/80 leading-relaxed text-center">
                {t("about").missionContent}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 border-b" style={{ borderColor: 'rgba(139, 46, 46, 0.2)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#a62a26] dark:text-white">
              {t("about").servicesTitle}
            </h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid md:grid-cols-2 gap-6">
            {t("about").services.map((service: string, index: number) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <Card className="backdrop-blur-md border-[#a62a26]/20 dark:border-white/20 h-full hover:border-[#a62a26]/40 dark:hover:border-white/40 transition-all light:bg-white dark:bg-[#000814]/90">
                  <CardContent className="p-8">
                    <motion.div className="p-4 w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform light:bg-[rgba(166,42,38,0.1)] dark:bg-white/10">
                      <CheckCircle2 className="h-8 w-8 text-[#a62a26] dark:text-white" />
                    </motion.div>
                    <p className="leading-relaxed text-lg font-semibold text-[#a62a26] dark:text-white">{service}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 md:py-32 border-b" style={{ borderColor: 'rgba(139, 46, 46, 0.2)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#a62a26] dark:text-white">
              {t("about").targetTitle}
            </h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid md:grid-cols-3 gap-6">
            {t("about").targets.map((target: string, index: number) => (
              <motion.div key={index} variants={itemVariants} className="p-8 rounded-2xl backdrop-blur-md border border-[#a62a26]/20 dark:border-white/20 hover:border-[#a62a26]/40 dark:hover:border-white/40 transition-all group light:bg-white dark:bg-[#000814]/90">
                <motion.div className="flex justify-center mb-4" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.15 }}>
                  <div className="p-4 rounded-full light:bg-gradient-to-br light:from-[#a62a26]/20 light:to-transparent dark:from-white/10 dark:to-transparent">
                    <Users className="h-8 w-8 text-[#a62a26] dark:text-white" />
                  </div>
                </motion.div>
                <p className="font-semibold text-center text-[#a62a26]/90 dark:text-white/80">{target}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 md:py-32 border-b" style={{ borderColor: 'rgba(139, 46, 46, 0.2)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#a62a26] dark:text-white">
              {t("about").activitiesTitle}
            </h2>
            <p className="text-lg text-[#a62a26]/80 dark:text-white/80 max-w-2xl mx-auto">
              {t("about").activitiesSubtitle}
            </p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid md:grid-cols-2 gap-8 mt-12">
            {t("about").activities.map((activity: any, index: number) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -8 }} className="group">
                <div className="rounded-2xl p-8 backdrop-blur-md border border-[#a62a26]/20 dark:border-white/20 hover:border-[#a62a26]/40 dark:hover:border-white/40 transition-all h-full light:bg-white dark:bg-[#000814]/90">
                  <motion.div className="w-12 h-12 rounded-lg light:bg-gradient-to-br light:from-blue-400/20 light:to-purple-400/20 dark:from-white/10 dark:to-transparent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-6 w-6 text-[#a62a26] dark:text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 text-[#a62a26] dark:text-white">{activity.title}</h3>
                  <p className="text-[#a62a26]/80 dark:text-white/80 leading-relaxed">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-3xl p-12 md:p-24 backdrop-blur-md border text-center bg-white dark:bg-[#000814]/90" style={{ borderColor: 'rgba(166, 42, 38, 0.2)', borderWidth: '1px' }}>
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" animate={{ y: [0, 40, 0] }} transition={{ duration: 6, repeat: Infinity }} />
            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.h2 className="text-4xl md:text-5xl font-black mb-6 text-[#a62a26] dark:text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                Sẵn Sàng Bắt Đầu Hành Trình?
              </motion.h2>
              <motion.p className="text-lg mb-8 text-[#a62a26]/80 dark:text-white/80" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                Tham gia hàng nghìn học viên đang theo đuổi sự nghiệp của họ tại Hàn Quốc cùng HDP EDU.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Button asChild size="lg" className="group bg-[#a62a26] text-white hover:bg-[#8e2420] dark:bg-white dark:text-[#000814] dark:hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all font-bold text-base px-10 py-7">
                  <Link href="/courses" className="flex items-center gap-3">
                    Khám Phá Khóa Học
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}
