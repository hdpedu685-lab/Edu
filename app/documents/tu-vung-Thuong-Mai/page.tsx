"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, ShieldCheck, Globe, Handshake, BarChart3 } from "lucide-react"

const COMMERCE_VOCAB_DATA = [
  {
    title: "MẢNG 1: GIAO DỊCH – THƯƠNG MẠI CHUNG",
    items: [
      { kr: "거래", vi: "Giao dịch" },
      { kr: "상거래", vi: "Thương mại" },
      { kr: "계약", vi: "Hợp đồng" },
      { kr: "계약서", vi: "Văn bản hợp đồng" },
      { kr: "조건", vi: "Điều kiện" },
      { kr: "협상", vi: "Đàm phán" },
      { kr: "합의", vi: "Thỏa thuận" },
      { kr: "주문", vi: "Đơn đặt hàng" },
      { kr: "발주", vi: "Đặt hàng (B2B)" },
      { kr: "거래처", vi: "Đối tác" },
    ]
  },
  {
    title: "MẢNG 2: MUA BÁN – KINH DOANH",
    items: [
      { kr: "구매", vi: "Mua hàng" },
      { kr: "판매", vi: "Bán hàng" },
      { kr: "매출", vi: "Doanh thu" },
      { kr: "매입", vi: "Mua vào" },
      { kr: "단가", vi: "Đơn giá" },
      { kr: "가격 협의", vi: "Thương lượng giá" },
      { kr: "공급", vi: "Cung ứng" },
      { kr: "수요", vi: "Nhu cầu" },
      { kr: "재고", vi: "Tồn kho" },
      { kr: "납품", vi: "Giao hàng" },
    ]
  },
  {
    title: "MẢNG 3: XUẤT NHẬP KHẨU",
    items: [
      { kr: "수출", vi: "Xuất khẩu" },
      { kr: "수입", vi: "Nhập khẩu" },
      { kr: "통관", vi: "Thông quan" },
      { kr: "선적", vi: "Xuất hàng" },
      { kr: "운송", vi: "Vận chuyển" },
      { kr: "해상 운송", vi: "Vận chuyển đường biển" },
      { kr: "항공 운송", vi: "Vận chuyển đường hàng không" },
      { kr: "포장", vi: "Đóng gói" },
      { kr: "서류", vi: "Chứng từ" },
      { kr: "원산지", vi: "Xuất xứ" },
    ]
  },
  {
    title: "MẢNG 4: THANH TOÁN – TÀI CHÍNH THƯƠNG MẠI",
    items: [
      { kr: "결제", vi: "Thanh toán" },
      { kr: "송금", vi: "Chuyển tiền" },
      { kr: "외화", vi: "Ngoại tệ" },
      { kr: "환율", vi: "Tỷ giá" },
      { kr: "세금", vi: "Thuế" },
      { kr: "관세", vi: "Thuế hải quan" },
      { kr: "대금", vi: "Tiền hàng" },
      { kr: "선불", vi: "Trả trước" },
      { kr: "후불", vi: "Trả sau" },
      { kr: "미수금", vi: "Công nợ" },
    ]
  },
  {
    title: "MẢNG 5: HẬU MÃI – CHĂM SÓC KHÁCH HÀNG",
    items: [
      { kr: "클레임", vi: "Khiếu nại" },
      { kr: "반품", vi: "Trả hàng" },
      { kr: "교환", vi: "Đổi hàng" },
      { kr: "보상", vi: "Bồi thường" },
      { kr: "하자", vi: "Lỗi sản phẩm" },
      { kr: "품질 문제", vi: "Vấn đề chất lượng" },
      { kr: "납기 지연", vi: "Trễ giao hàng" },
      { kr: "사후 관리", vi: "Hậu mãi" },
      { kr: "신뢰", vi: "Uy tín" },
      { kr: "장기 거래", vi: "Hợp tác lâu dài" },
    ]
  }
];

export default function CommerceVocabPage() {
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
      <nav className="sticky top-0 z-50 bg-[#a62a26] border-b border-[#a62a26]/20 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/documents" className="flex items-center gap-2 text-white font-bold transition-all hover:opacity-80">
            <ArrowLeft size={20} /> Quay lại
          </Link>
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest">
            <Lock size={12} className="text-white" /> HDP TRADE-SECURE
          </div>
        </div>
      </nav>

      <header className="bg-[#a62a26] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
          <Globe size={400} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <BarChart3 size={14} />
            CHUYÊN ĐỀ XUẤT NHẬP KHẨU & THƯƠNG MẠI
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">
            Tiếng Hàn Thương Mại Quốc Tế
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-light">
            Trọn bộ từ vựng đàm phán, thanh toán quốc tế và quy trình xuất nhập khẩu chuyên sâu.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6" onCopy={(e) => e.preventDefault()}>
        <div className="space-y-12">
          {COMMERCE_VOCAB_DATA.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-[#a62a26] rounded-2xl flex items-center justify-center font-black text-xl shadow-lg border border-[#a62a26]/20">
                  {idx + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#a62a26] tracking-tight uppercase">
                  {section.title}
                </h2>
                <div className="flex-grow h-px bg-[#a62a26]/20"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#a62a26]/40 transition-all group">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-[#a62a26] group-hover:text-[#a62a26] transition-colors">{item.kr}</span>
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
          <div className="bg-[#a62a26] p-8 rounded-3xl flex flex-col items-center border border-[#a62a26]/40 shadow-sm">
            <Handshake size={44} className="text-white mb-4 opacity-80" />
            <p className="text-white font-black uppercase tracking-widest text-sm">HDP EDU - GLOBAL BUSINESS ACADEMY</p>
            <p className="text-white/80 text-xs mt-2 max-w-md mx-auto">
              Nội dung đào tạo độc quyền. Nghiêm cấm mọi hình thức sao chép, sử dụng cho mục đích thương mại mà không có sự đồng ý.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
