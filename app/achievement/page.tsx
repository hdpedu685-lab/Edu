"use client";

import {
  Trophy,
  Award,
  Star,
  Medal,
  Target,
  BookOpen,
  Clock,
  Flame,
  Lock,
  CheckCircle2,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { cn } from "@/lib/utils";

const certificates = [
  {
    id: 1,
    title: { vi: "Korean Basic Level 1", ko: "한국어 기초 1급" },
    issueDate: "2024-01-10",
    unlocked: true,
  },
  {
    id: 2,
    title: { vi: "Korean Basic Level 2", ko: "한국어 기초 2급" },
    issueDate: "2024-01-15",
    unlocked: true,
  },
  {
    id: 3,
    title: { vi: "Business Korean", ko: "비즈니스 한국어" },
    issueDate: null,
    unlocked: false,
  },
  {
    id: 4,
    title: { vi: "Korean Culture Expert", ko: "한국 문화 전문가" },
    issueDate: null,
    unlocked: false,
  },
];

const badges = [
  {
    id: 1,
    name: { vi: "Người Mới Bắt Đầu", ko: "초보자" },
    description: { vi: "Hoàn thành bài học đầu tiên", ko: "첫 번째 레슨 완료" },
    icon: Star,
    unlocked: true,
    color: "text-amber-500",
  },
  {
    id: 2,
    name: { vi: "Siêng Năng", ko: "근면한 학생" },
    description: { vi: "Học 7 ngày liên tiếp", ko: "7일 연속 학습" },
    icon: Flame,
    unlocked: true,
    color: "text-orange-500",
  },
  {
    id: 3,
    name: { vi: "Hoàn Thành Khóa Học", ko: "코스 완료" },
    description: { vi: "Hoàn thành 1 khóa học", ko: "1개 코스 완료" },
    icon: Trophy,
    unlocked: true,
    color: "text-yellow-500",
  },
  {
    id: 4,
    name: { vi: "Học Giả", ko: "학자" },
    description: { vi: "Hoàn thành 5 khóa học", ko: "5개 코스 완료" },
    icon: Award,
    unlocked: false,
    color: "text-purple-500",
  },
  {
    id: 5,
    name: { vi: "Chuyên Gia", ko: "전문가" },
    description: { vi: "Hoàn thành 10 khóa học", ko: "10개 코스 완료" },
    icon: Medal,
    unlocked: false,
    color: "text-blue-500",
  },
  {
    id: 6,
    name: { vi: "Marathon Học Tập", ko: "학습 마라톤" },
    description: { vi: "Học 30 ngày liên tiếp", ko: "30일 연속 학습" },
    icon: Target,
    unlocked: false,
    color: "text-emerald-500",
  },
];

export default function AchievementPage() {
  const { language, t } = useLanguage();
  const { user } = useUser();

  const stats = [
    {
      label: t("certificates"),
      value: certificates.filter((c) => c.unlocked).length,
      total: certificates.length,
      icon: Award,
      color: "text-amber-500",
    },
    {
      label: t("badges"),
      value: badges.filter((b) => b.unlocked).length,
      total: badges.length,
      icon: Medal,
      color: "text-purple-500",
    },
    {
      label: t("points"),
      value: "2,450",
      total: null,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: t("level"),
      value: "12",
      total: null,
      icon: Target,
      color: "text-emerald-500",
    },
  ];

  const levelProgress = 65;
  const nextLevelPoints = 3000;
  const currentPoints = 2450;

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/bg-course.png)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero Section */}
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl backdrop-blur-md border px-8 py-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            <h1 className="text-balance text-3xl font-bold text-white md:text-4xl">
              {t("achievementTitle")}
            </h1>
            <p className="mt-2 text-white/80">{t("achievementDescription")}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="backdrop-blur-md border-white/30"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-white/10 p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                      {stat.total && (
                        <span className="text-sm font-normal text-white/80">
                          /{stat.total}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-white/80">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Level Progress */}
        <Card
          className="mt-8 backdrop-blur-md border-white/30"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-2xl font-bold text-white">
                  12
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {t("level")} 12
                  </p>
                  <p className="text-sm text-white/80">
                    {currentPoints} / {nextLevelPoints} {t("points")}
                  </p>
                </div>
              </div>
              <div className="w-full flex-1 sm:max-w-xs">
                <Progress value={levelProgress} className="h-3" />
                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {nextLevelPoints - currentPoints}{" "}
                  {language === "vi" ? "điểm để lên cấp" : "포인트 필요"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Certificates */}
          <Card
            className="backdrop-blur-md border-white/30"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-amber-500" />
                {t("certificates")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg border border-border p-4",
                      cert.unlocked ? "bg-secondary/30" : "opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {cert.unlocked ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {cert.title[language]}
                        </p>
                        {cert.issueDate && (
                          <p className="text-sm text-muted-foreground">
                            {language === "vi" ? "Ngày cấp: " : "발급일: "}
                            {cert.issueDate}
                          </p>
                        )}
                      </div>
                    </div>
                    {cert.unlocked && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card
            className="backdrop-blur-md border-white/30"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-purple-500" />
                {t("badges")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={cn(
                      "flex flex-col items-center rounded-lg border border-border p-4 text-center transition-all",
                      badge.unlocked
                        ? "bg-secondary/30"
                        : "opacity-50 grayscale"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full bg-secondary p-3",
                        badge.unlocked ? badge.color : "text-muted-foreground"
                      )}
                    >
                      <badge.icon className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {badge.name[language]}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {badge.description[language]}
                    </p>
                    <Badge
                      variant={badge.unlocked ? "default" : "secondary"}
                      className="mt-2"
                    >
                      {badge.unlocked ? t("unlocked") : t("locked")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
