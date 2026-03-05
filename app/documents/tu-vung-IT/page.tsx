"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, ShieldCheck, Cpu, Terminal } from "lucide-react"

const IT_VOCAB_DATA = [
  {
    title: "MẢNG 1: HẠ TẦNG – PHẦN CỨNG",
    items: [
      { kr: "서버", vi: "Máy chủ" },
      { kr: "네트워크", vi: "Mạng" },
      { kr: "장비", vi: "Thiết bị" },
      { kr: "하드웨어", vi: "Phần cứng" },
      { kr: "스토리지", vi: "Lưu trữ" },
      { kr: "데이터 센터", vi: "Trung tâm dữ liệu" },
      { kr: "라우터", vi: "Bộ định tuyến" },
      { kr: "스위치", vi: "Bộ chuyển mạch" },
      { kr: "케이블", vi: "Cáp" },
      { kr: "전원 공급 장치", vi: "Bộ nguồn" },
    ]
  },
  {
    title: "MẢNG 2: PHẦN MỀM – HỆ THỐNG",
    items: [
      { kr: "소프트웨어", vi: "Phần mềm" },
      { kr: "운영체제", vi: "Hệ điều hành" },
      { kr: "프로그램", vi: "Chương trình" },
      { kr: "애플리케이션", vi: "Ứng dụng" },
      { kr: "시스템", vi: "Hệ thống" },
      { kr: "버전", vi: "Phiên bản" },
      { kr: "업데이트", vi: "Cập nhật" },
      { kr: "설치", vi: "Cài đặt" },
      { kr: "설정", vi: "Cấu hình" },
      { kr: "라이선스", vi: "Bản quyền" },
    ]
  },
  {
    title: "MẢNG 3: LẬP TRÌNH – PHÁT TRIỂN",
    items: [
      { kr: "개발", vi: "Phát triển" },
      { kr: "개발자", vi: "Lập trình viên" },
      { kr: "소스 코드", vi: "Mã nguồn" },
      { kr: "코드", vi: "Mã" },
      { kr: "디버깅", vi: "Gỡ lỗi" },
      { kr: "알고리즘", vi: "Thuật toán" },
      { kr: "함수", vi: "Hàm" },
      { kr: "데이터 구조", vi: "Cấu trúc dữ liệu" },
      { kr: "프레임워크", vi: "Framework" },
      { kr: "API", vi: "Giao diện lập trình" },
    ]
  },
  {
    title: "MẢNG 4: DỮ LIỆU – BẢO MẬT",
    items: [
      { kr: "데이터", vi: "Dữ liệu" },
      { kr: "데이터베이스", vi: "Cơ sở dữ liệu" },
      { kr: "백업", vi: "Sao lưu" },
      { kr: "복구", vi: "Phục hồi" },
      { kr: "보안", vi: "Bảo mật" },
      { kr: "권한", vi: "Quyền truy cập" },
      { kr: "암호화", vi: "Mã hóa" },
      { kr: "해킹", vi: "Tấn công mạng" },
      { kr: "방화벽", vi: "Tường lửa" },
      { kr: "접근 제어", vi: "Kiểm soát truy cập" },
    ]
  },
  {
    title: "MẢNG 5: VẬN HÀNH – HỖ TRỢ IT",
    items: [
      { kr: "유지보수", vi: "Bảo trì" },
      { kr: "운영", vi: "Vận hành" },
      { kr: "장애", vi: "Sự cố" },
      { kr: "오류", vi: "Lỗi" },
      { kr: "트러블슈팅", vi: "Xử lý sự cố" },
      { kr: "기술 지원", vi: "Hỗ trợ kỹ thuật" },
      { kr: "사용자", vi: "Người dùng" },
      { kr: "요청", vi: "Yêu cầu" },
      { kr: "처리", vi: "Xử lý" },
      { kr: "로그", vi: "Nhật ký hệ thống" },
    ]
  }
];

export default function ITVocabPage() {
  // Security Layer
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
          <Link href="/documents" className="flex items-center gap-2 text-white font-bold transition-transform hover:opacity-80">
            <ArrowLeft size={20} /> Quay lại
          </Link>
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest">
            <Lock size={12} className="text-white" /> HDP IT-SECURITY
          </div>
        </div>
      </nav>

      <header className="bg-[#a62a26] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
          <Terminal size={400} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#a62a26] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <Cpu size={14} />
            CHUYÊN ĐỀ CNTT (IT)
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Từ Vựng Tiếng Hàn Chuyên Ngành IT
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-light">
            Hệ thống từ vựng kỹ thuật dành cho lập trình viên và nhân sự vận hành hệ thống trong doanh nghiệp Hàn Quốc.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6" onCopy={(e) => e.preventDefault()}>
        <div className="space-y-16">
          {IT_VOCAB_DATA.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-[#a62a26] rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg border border-[#a62a26]/20">
                  {idx + 1}
                </div>
                <h2 className="text-2xl font-black text-[#a62a26] tracking-tight uppercase">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#a62a26]/40 transition-all group">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-[#a62a26]">{item.kr}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#a62a26]/80 font-medium">{item.vi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-12 border-t border-[#a62a26]/20 text-center">
          <ShieldCheck size={48} className="mx-auto text-[#a62a26] opacity-60 mb-4" />
          <p className="text-[#a62a26] font-bold">BẢN QUYỀN THUỘC HDP EDU</p>
          <p className="text-[#a62a26]/80 text-sm max-w-md mx-auto mt-2">
            Tài liệu này được mã hóa bảo vệ. Mọi hành vi sao chép trái phép sẽ bị truy cứu trách nhiệm.
          </p>
        </footer>
      </main>
    </div>
  )
}
