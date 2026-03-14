"use client"

import { MapPin, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { language } = useLanguage()

  const content =
    language === "vi"
      ? {
          intro:
            "Nền tảng đào tạo định hướng nghề nghiệp tại Hàn Quốc, tập trung kỹ năng thực tế, tiếng Hàn ứng dụng và văn hóa doanh nghiệp.",
          explore: "Khám Phá",
          support: "Hỗ Trợ",
          contact: "Liên Hệ",
          address: "Tầng 4, tòa SHG số 8 Quang Trung, Hà Đông, Hà Nội",
          copyright: "Tất cả quyền được bảo lưu.",
          privacy: "Chính Sách Bảo Mật",
          terms: "Điều Khoản Sử Dụng",
        }
      : {
          intro:
            "한국 취업 준비를 위한 커리어 교육 플랫폼으로, 실무 중심 역량과 한국어 커뮤니케이션, 기업 문화를 집중적으로 제공합니다.",
          explore: "탐색",
          support: "지원",
          contact: "문의",
          address: "하노이 하동, 꽝쭝 8번지 SHG 빌딩 4층",
          copyright: "모든 권리 보유.",
          privacy: "개인정보 처리방침",
          terms: "이용약관",
        }

  const quickLinks = [
    {
      href: "/about-us",
      label: language === "vi" ? "Về Chúng Tôi" : "회사 소개",
    },
    { href: "/courses", label: language === "vi" ? "Khoá Học" : "강의" },
    {
      href: "/publication",
      label: language === "vi" ? "Sách Xuất Bản" : "출판 도서",
    },
    { href: "/jobs", label: language === "vi" ? "Việc Làm" : "채용" },
  ]

  const supportLinks = [
    {
      href: "/blog",
      label: language === "vi" ? "Blog Cộng Đồng" : "커뮤니티 블로그",
    },
    {
      href: "/dashboard",
      label: language === "vi" ? "Dashboard" : "대시보드",
    },
    {
      href: "/documents",
      label: language === "vi" ? "Tài Liệu" : "자료실",
    },
  ]

  return (
    <footer className="w-full border-t border-[#7f201d]/25 bg-gradient-to-b from-[#a62a26] to-[#8c1f1b] text-white dark:border-white/10 dark:from-[#071225] dark:to-[#000814]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 text-left md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-6">
            <h2 className="text-3xl font-black tracking-tight">HDP EDU</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {content.intro}
            </p>
            <div className="mt-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
              Learn • Work • Grow
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/85">{content.explore}</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/85">{content.support}</h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/85">{content.contact}</h3>
            <div className="mt-4 space-y-3.5 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/65" />
                <p>{content.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-white/65" />
                <a href="tel:+84909888777" className="text-white/80 hover:text-white">+84 896 631 896</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-white/65" />
                <a href="mailto:support@hdpedu.vn" className="transition-colors hover:text-white">support@hdpedu.vn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15" />

        <div className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-white/65 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} HDP EDU. {content.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="text-white/80 hover:text-white">
              {content.privacy}
            </a>
            <a href="#" className="text-white/80 hover:text-white">
              {content.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
