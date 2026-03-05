"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, ShieldCheck, Factory, Settings, HardHat } from "lucide-react"

const PRODUCTION_VOCAB_DATA = [
  {
    title: "MẢNG 1: SẢN XUẤT – QUY TRÌNH",
    items: [
      { kr: "생산", vi: "Sản xuất" },
      { kr: "생산라인", vi: "Dây chuyền sản xuất" },
      { kr: "공정", vi: "Công đoạn" },
      { kr: "작업", vi: "Công việc / thao tác" },
      { kr: "작업자", vi: "Công nhân" },
      { kr: "작업 지시", vi: "Chỉ thị công việc" },
      { kr: "공정 흐름", vi: "Luồng công đoạn" },
      { kr: "생산 계획", vi: "Kế hoạch sản xuất" },
      { kr: "생산량", vi: "Sản lượng" },
      { kr: "생산성", vi: "Năng suất" },
    ]
  },
  {
    title: "MẢNG 2: THIẾT BỊ – MÁY MÓC",
    items: [
      { kr: "설비", vi: "Thiết bị" },
      { kr: "장비", vi: "Máy móc" },
      { kr: "기계", vi: "Máy" },
      { kr: "자동화", vi: "Tự động hóa" },
      { kr: "수동", vi: "Thủ công" },
      { kr: "가동", vi: "Vận hành" },
      { kr: "정지", vi: "Dừng máy" },
      { kr: "점검", vi: "Kiểm tra" },
      { kr: "유지보수", vi: "Bảo trì" },
      { kr: "고장", vi: "Hỏng hóc" },
    ]
  },
  {
    title: "MẢNG 3: CHẤT LƯỢNG – KIỂM TRA",
    items: [
      { kr: "품질", vi: "Chất lượng" },
      { kr: "검사", vi: "Kiểm tra" },
      { kr: "불량", vi: "Lỗi / NG" },
      { kr: "양품", vi: "Hàng đạt / OK" },
      { kr: "기준", vi: "Tiêu chuẩn" },
      { kr: "규격", vi: "Quy cách" },
      { kr: "검사 기준", vi: "Tiêu chuẩn kiểm tra" },
      { kr: "전수 검사", vi: "Kiểm tra 100%" },
      { kr: "샘플 검사", vi: "Kiểm tra mẫu" },
      { kr: "품질 문제", vi: "Vấn đề chất lượng" },
    ]
  },
  {
    title: "MẢNG 4: NGUYÊN VẬT LIỆU – KHO",
    items: [
      { kr: "원자재", vi: "Nguyên vật liệu" },
      { kr: "부자재", vi: "Vật tư phụ" },
      { kr: "자재", vi: "Vật liệu" },
      { kr: "입고", vi: "Nhập kho" },
      { kr: "출고", vi: "Xuất kho" },
      { kr: "재고", vi: "Tồn kho" },
      { kr: "재고 관리", vi: "Quản lý tồn kho" },
      { kr: "자재 부족", vi: "Thiếu vật liệu" },
      { kr: "자재 불량", vi: "Lỗi vật liệu" },
      { kr: "보관", vi: "Lưu kho" },
    ]
  },
  {
    title: "MẢNG 5: TIẾN ĐỘ – QUẢN LÝ SẢN XUẤT",
    items: [
      { kr: "납기", vi: "Thời hạn giao hàng" },
      { kr: "납기 준수", vi: "Đúng hạn" },
      { kr: "납기 지연", vi: "Trễ hạn" },
      { kr: "일정", vi: "Tiến độ" },
      { kr: "생산 관리", vi: "Quản lý sản xuất" },
      { kr: "작업 시간", vi: "Thời gian làm việc" },
      { kr: "야근", vi: "Tăng ca" },
      { kr: "문제 발생", vi: "Phát sinh sự cố" },
      { kr: "개선", vi: "Cải tiến" },
      { kr: "보고", vi: "Báo cáo" },
    ]
  }
];

export default function ProductionVocabPage() {
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
            <ArrowLeft size={20} /> Quay lại danh mục
          </Link>
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest">
            <Lock size={12} className="text-white" /> HDP FACTORY-SECURE
          </div>
        </div>
      </nav>

      <header className="bg-[#a62a26] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
          <Factory size={400} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <Settings size={14} className="animate-spin-slow" />
            CHUYÊN ĐỀ SẢN XUẤT & NHÀ MÁY
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">
            Từ Vựng Tiếng Hàn Sản Xuất
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl font-light">
            Cẩm nang từ vựng công xưởng dành cho quản lý sản xuất, QC và kỹ thuật viên vận hành dây chuyền.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6" onCopy={(e) => e.preventDefault()}>
        <div className="space-y-12">
          {PRODUCTION_VOCAB_DATA.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-[#a62a26] rounded-xl flex items-center justify-center font-black text-xl border-b-4 border-[#a62a26]">
                  {idx + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#a62a26] tracking-tight uppercase">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-[#a62a26]/40 transition-all group">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-[#a62a26] group-hover:text-[#a62a26]">{item.kr}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#a62a26]/80 font-semibold">{item.vi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-12 border-t border-[#a62a26]/20 text-center">
          <div className="bg-[#a62a26] p-8 rounded-3xl flex flex-col items-center">
            <HardHat size={44} className="text-white mb-4 opacity-80" />
            <p className="text-white font-black uppercase tracking-widest text-sm">HDP EDU - INDUSTRIAL TRAINING</p>
            <p className="text-white/80 text-xs mt-2 max-w-md mx-auto">
              Nội dung thuộc bản quyền HDP EDU. Nghiêm cấm mọi hành vi chia sẻ link hoặc sao chép dữ liệu ra bên ngoài hệ thống.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
