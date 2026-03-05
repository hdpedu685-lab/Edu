"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, ShieldCheck, BookOpen, GraduationCap } from "lucide-react"

const VOCAB_DATA = [
  {
    title: "MẢNG 1: HÀNH CHÍNH – TỔ CHỨC CÔNG TY",
    items: [
      { kr: "행정", vi: "Hành chính" },
      { kr: "사무", vi: "Văn phòng" },
      { kr: "회사", vi: "Công ty" },
      { kr: "부서", vi: "Phòng ban" },
      { kr: "조직", vi: "Tổ chức" },
      { kr: "직무", vi: "Chức vụ" },
      { kr: "직책", vi: "Chức danh" },
      { kr: "담당자", vi: "Người phụ trách" },
      { kr: "소속", vi: "Thuộc bộ phận" },
      { kr: "내규", vi: "Quy định nội bộ" },
    ]
  },
  {
    title: "MẢNG 2: NHÂN SỰ – LAO ĐỘNG",
    items: [
      { kr: "인사", vi: "Nhân sự" },
      { kr: "직원", vi: "Nhân viên" },
      { kr: "사원", vi: "Nhân viên (cấp thấp)" },
      { kr: "채용", vi: "Tuyển dụng" },
      { kr: "입사", vi: "Vào công ty" },
      { kr: "퇴사", vi: "Nghỉ việc" },
      { kr: "근무", vi: "Làm việc" },
      { kr: "출근", vi: "Đi làm" },
      { kr: "퇴근", vi: "Tan ca" },
      { kr: "근태", vi: "Chuyên cần" },
    ]
  },
  {
    title: "MẢNG 3: GIẤY TỜ – HỒ SƠ – VĂN BẢN",
    items: [
      { kr: "서류", vi: "Giấy tờ" },
      { kr: "문서", vi: "Văn bản" },
      { kr: "공문", vi: "Công văn" },
      { kr: "양식", vi: "Biểu mẫu" },
      { kr: "신청서", vi: "Đơn đăng ký" },
      { kr: "보고서", vi: "Báo cáo" },
      { kr: "회의록", vi: "Biên bản họp" },
      { kr: "결재", vi: "Trình ký" },
      { kr: "보관", vi: "Lưu trữ" },
      { kr: "출력", vi: "In ấn" },
    ]
  },
  {
    title: "MẢNG 4: HỌP HÀNH – LÀM VIỆC",
    items: [
      { kr: "회의", vi: "Cuộc họp" },
      { kr: "일정", vi: "Lịch trình" },
      { kr: "안건", vi: "Nội dung họp" },
      { kr: "논의", vi: "Thảo luận" },
      { kr: "결정", vi: "Quyết định" },
      { kr: "공유", vi: "Chia sẻ" },
      { kr: "전달", vi: "Truyền đạt" },
      { kr: "요청", vi: "Yêu cầu" },
      { kr: "협조", vi: "Phối hợp" },
      { kr: "확인", vi: "Xác nhận" },
    ]
  },
  {
    title: "MẢNG 5: QUẢN LÝ – CHẾ ĐỘ – PHÚC LỢI",
    items: [
      { kr: "관리", vi: "Quản lý" },
      { kr: "규정", vi: "Quy định" },
      { kr: "급여", vi: "Lương" },
      { kr: "상여", vi: "Thưởng" },
      { kr: "복지", vi: "Phúc lợi" },
      { kr: "휴가", vi: "Nghỉ phép" },
      { kr: "연차", vi: "Phép năm" },
      { kr: "초과 근무", vi: "Làm thêm giờ" },
      { kr: "출장", vi: "Công tác" },
      { kr: "평가", vi: "Đánh giá" },
    ]
  }
];

export default function VocabHCVPage() {
  // Security Layer: Disable Right-Click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat select-none" style={{
      backgroundImage: 'url(/bg-course.png)',
      backgroundAttachment: 'fixed',
    }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/documents" className="flex items-center gap-2 text-[#a62a26] font-bold transition-transform hover:-translate-x-1">
            <ArrowLeft size={20} /> Quay lại tài liệu
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <Lock size={12} className="text-[#a62a26]" /> 
            HDP EDU Security Active
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-[#a62a26] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
          <GraduationCap size={400} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <BookOpen size={14} />
            CHUYÊN ĐỀ TIẾNG HÀN CÔNG SỞ
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Từ Vựng Hành Chính Văn Phòng
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-light">
            Tổng hợp các thuật ngữ cốt lõi được sử dụng trong môi trường văn phòng chuyên nghiệp tại Hàn Quốc.
          </p>
        </div>
      </header>

      {/* Content Container */}
      <main className="max-w-5xl mx-auto py-12 px-6" onCopy={(e) => e.preventDefault()}>
        <div className="space-y-16">
          {VOCAB_DATA.map((section, sectionIdx) => (
            <section key={sectionIdx}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-[#a62a26] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-[#a62a26]/20">
                  {sectionIdx + 1}
                </div>
                <h2 className="text-2xl font-black text-[#a62a26] tracking-tight uppercase">
                  {section.title}
                </h2>
                <div className="flex-grow h-px bg-slate-200 hidden md:block"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {section.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#a62a26]/40 hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-[#a62a26] font-bold mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        KOREAN
                      </span>
                      <span className="text-xl font-bold text-[#a62a26] leading-none">
                        {item.kr}
                      </span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[10px] text-[#a62a26]/80 font-bold mb-0.5 uppercase">
                        Vietnamese
                      </span>
                      <span className="text-[#a62a26]/80 font-medium">
                        {item.vi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Protection Footer */}
        <footer className="mt-20 pt-12 border-t border-slate-200 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <ShieldCheck size={48} className="text-[#a62a26] opacity-30" />
            <div className="space-y-1">
              <p className="text-slate-500 font-bold">TÀI LIỆU BẢO MẬT HDP EDU</p>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Mọi hành vi sao chép, chụp ảnh màn hình hoặc phát tán trái phép nội dung này đều vi phạm điều khoản sử dụng và quyền sở hữu trí tuệ.
              </p>
            </div>
            <p className="text-slate-300 text-xs mt-8 font-mono">
              Fingerprint: {new Date().getFullYear()}-HDP-SECURE-ID-DOCS
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
