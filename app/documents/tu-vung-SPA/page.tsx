"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, ShieldCheck, Sparkles, Flower2, HeartPulse } from "lucide-react"

const SPA_VOCAB_DATA = [
  {
    title: "MẢNG 1: CƠ SỞ SPA – DỊCH VỤ CHUNG",
    items: [
      { kr: "스파", vi: "Spa" },
      { kr: "미용실", vi: "Thẩm mỹ viện" },
      { kr: "피부관리", vi: "Chăm sóc da" },
      { kr: "미용 서비스", vi: "Dịch vụ làm đẹp" },
      { kr: "관리 프로그램", vi: "Liệu trình" },
      { kr: "예약", vi: "Đặt lịch" },
      { kr: "상담", vi: "Tư vấn" },
      { kr: "고객", vi: "Khách hàng" },
      { kr: "회원", vi: "Hội viên" },
      { kr: "방문", vi: "Ghé thăm" },
    ]
  },
  {
    title: "MẢNG 2: CHĂM SÓC DA – DA LIỄU CƠ BẢN",
    items: [
      { kr: "피부", vi: "Da" },
      { kr: "피부 타입", vi: "Loại da" },
      { kr: "건성 피부", vi: "Da khô" },
      { kr: "지성 피부", vi: "Da dầu" },
      { kr: "민감성 피부", vi: "Da nhạy cảm" },
      { kr: "트러블", vi: "Vấn đề da" },
      { kr: "여드름", vi: "Mụn" },
      { kr: "잡티", vi: "Đốm / thâm" },
      { kr: "주름", vi: "Nếp nhăn" },
      { kr: "탄력", vi: "Độ đàn hồi" },
    ]
  },
  {
    title: "MẢNG 3: LIỆU TRÌNH – KỸ THUẬT SPA",
    items: [
      { kr: "클렌징", vi: "Làm sạch" },
      { kr: "각질 제거", vi: "Tẩy tế bào chết" },
      { kr: "마사지", vi: "Massage" },
      { kr: "팩", vi: "Đắp mặt nạ" },
      { kr: "보습", vi: "Dưỡng ẩm" },
      { kr: "미백", vi: "Làm trắng" },
      { kr: "재생", vi: "Tái tạo" },
      { kr: "진정", vi: "Làm dịu" },
      { kr: "관리 시간", vi: "Thời gian liệu trình" },
      { kr: "관리 효과", vi: "Hiệu quả chăm sóc" },
    ]
  },
  {
    title: "MẢNG 4: MÁY MÓC – SẢN PHẨM SPA",
    items: [
      { kr: "미용 기기", vi: "Thiết bị làm đẹp" },
      { kr: "레이저", vi: "Laser" },
      { kr: "고주파", vi: "Sóng cao tần" },
      { kr: "초음파", vi: "Sóng siêu âm" },
      { kr: "LED 관리기", vi: "Máy LED" },
      { kr: "화장품", vi: "Mỹ phẩm" },
      { kr: "앰플", vi: "Tinh chất" },
      { kr: "크림", vi: "Kem" },
      { kr: "세럼", vi: "Serum" },
      { kr: "마스크팩", vi: "Mặt nạ" },
    ]
  },
  {
    title: "MẢNG 5: NHÂN SỰ – HẬU MÃI SPA",
    items: [
      { kr: "피부관리사", vi: "Kỹ thuật viên chăm sóc da" },
      { kr: "미용사", vi: "Kỹ thuật viên thẩm mỹ" },
      { kr: "원장", vi: "Chủ spa" },
      { kr: "직원", vi: "Nhân viên" },
      { kr: "위생", vi: "Vệ sinh" },
      { kr: "소독", vi: "Khử trùng" },
      { kr: "불만", vi: "Phàn nàn" },
      { kr: "재방문", vi: "Quay lại" },
      { kr: "만족도", vi: "Mức độ hài lòng" },
      { kr: "사후 관리", vi: "Chăm sóc sau liệu trình" },
    ]
  }
];

export default function SPAVocabPage() {
  // Protection: Disable Right-Click
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
      <nav className="sticky top-0 z-50 bg-[#a62a26] border-b border-[#a62a26]/20 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/documents" className="flex items-center gap-2 text-white font-bold transition-all hover:opacity-80">
            <ArrowLeft size={20} /> Quay lại
          </Link>
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest">
            <Lock size={12} className="text-white" /> HDP BEAUTY-SECURE
          </div>
        </div>
      </nav>

      <header className="bg-[#a62a26] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 rotate-12">
          <Flower2 size={400} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <Sparkles size={14} />
            CHUYÊN ĐỀ SPA & THẨM MỸ
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Từ Vựng Tiếng Hàn Ngành Spa
          </h1>
          <p className="text-lg text-rose-100 max-w-2xl font-light italic">
            "Hệ thống thuật ngữ dành cho chuyên viên chăm sóc sắc đẹp và quản lý Spa cao cấp."
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6" onCopy={(e) => e.preventDefault()}>
        <div className="space-y-16">
          {SPA_VOCAB_DATA.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-[#a62a26] text-white rounded-full flex items-center justify-center font-bold text-xl border-2 border-[#a62a26]/40 shadow-sm">
                  {idx + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#a62a26] tracking-tight">
                  {section.title}
                </h2>
                <div className="flex-grow h-px bg-[#a62a26]/20"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-[#a62a26]/40 transition-all group">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#a62a26]/60 font-bold uppercase mb-1">Tiếng Hàn</span>
                      <span className="text-xl font-bold text-[#a62a26] group-hover:text-[#a62a26]">{item.kr}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Nghĩa</span>
                      <span className="text-[#a62a26]/80 font-medium">{item.vi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-12 border-t border-[#a62a26]/20 text-center">
          <div className="bg-[#a62a26] p-8 rounded-3xl border border-[#a62a26]/40 flex flex-col items-center shadow-sm">
            <HeartPulse size={40} className="text-white mb-4 opacity-80" />
            <p className="text-white font-black uppercase tracking-widest text-sm">HDP EDU - BEAUTY ACADEMY</p>
            <p className="text-white/80 text-xs mt-2 max-w-md">
              Tài liệu giảng dạy nội bộ chuyên ngành thẩm mỹ. Nghiêm cấm mọi hành vi sao chép hoặc đăng tải lại khi chưa được sự đồng ý.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
