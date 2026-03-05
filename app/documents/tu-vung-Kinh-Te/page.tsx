"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, ShieldCheck, TrendingUp, Landmark, PieChart } from "lucide-react"

const KINH_TE_DATA = [
  {
    title: "I. KINH TẾ VĨ MÔ & THỂ CHẾ KINH TẾ",
    items: [
      { kr: "경제", vi: "Kinh tế" },
      { kr: "거시경제", vi: "Kinh tế vĩ mô" },
      { kr: "경제성장", vi: "Tăng trưởng kinh tế" },
      { kr: "경제발전", vi: "Phát triển kinh tế" },
      { kr: "경제공황", vi: "Khủng hoảng kinh tế" },
      { kr: "경기", vi: "Tình hình kinh tế" },
      { kr: "경기변동", vi: "Biến động kinh tế" },
      { kr: "경기예측", vi: "Dự báo kinh tế" },
      { kr: "경기정책", vi: "Chính sách kinh tế" },
      { kr: "시장경제체제", vi: "Thể chế kinh tế thị trường" },
      { kr: "중앙계획경제체제", vi: "Kinh tế kế hoạch tập trung" },
      { kr: "사회주의 경제", vi: "Kinh tế XHCN" },
      { kr: "자본주의 경제", vi: "Kinh tế tư bản" },
      { kr: "사회주의향한 시장경제", vi: "Kinh tế thị trường định hướng XHCN" },
      { kr: "개방경제", vi: "Nền kinh tế mở" },
      { kr: "경제개방", vi: "Mở cửa kinh tế" },
      { kr: "지하경제", vi: "Kinh tế ngầm" },
      { kr: "GDP 의 구조", vi: "Cấu trúc GDP" },
    ]
  },
  {
    title: "II. DOANH NGHIỆP & ĐẦU TƯ",
    items: [
      { kr: "국영기업", vi: "Doanh nghiệp nhà nước" },
      { kr: "공기업", vi: "Doanh nghiệp công" },
      { kr: "공기업개혁", vi: "Cải cách DNNN" },
      { kr: "공기업형태", vi: "Hình thức DNNN" },
      { kr: "사기업", vi: "Doanh nghiệp tư nhân" },
      { kr: "개인회사", vi: "Công ty tư nhân" },
      { kr: "합작회사", vi: "Công ty liên doanh" },
      { kr: "합작주식회사", vi: "Công ty cổ phần liên doanh" },
      { kr: "외국기업", vi: "Doanh nghiệp nước ngoài" },
      { kr: "100%외투법인", vi: "DN 100% vốn nước ngoài" },
      { kr: "상장회사수", vi: "Số DN niêm yết" },
      { kr: "총시장투자금액", vi: "Tổng vốn đầu tư thị trường" },
      { kr: "공적투자", vi: "Đầu tư công" },
      { kr: "간접투자형식", vi: "Đầu tư gián tiếp" },
      { kr: "직접고용", vi: "Tuyển dụng trực tiếp" },
    ]
  },
  {
    title: "III. NGÂN HÀNG – TÀI CHÍNH – TIỀN TỆ",
    items: [
      { kr: "금융경영", vi: "Kinh doanh tiền tệ" },
      { kr: "국책은행", vi: "Ngân hàng quốc doanh" },
      { kr: "상업은행", vi: "Ngân hàng thương mại" },
      { kr: "외국계은행", vi: "Ngân hàng nước ngoài" },
      { kr: "합작은행", vi: "Ngân hàng liên doanh" },
      { kr: "은행법 공표", vi: "Công bố luật ngân hàng" },
      { kr: "은행에 대한 법령", vi: "Pháp lệnh ngân hàng" },
      { kr: "고정금리", vi: "Lãi suất cố định" },
      { kr: "고정이율", vi: "Lãi suất cố định" },
      { kr: "고정환율제도", vi: "Chế độ tỷ giá cố định" },
      { kr: "재외동포송금", vi: "Kiều hối" },
      { kr: "ODA 자금규모", vi: "Quy mố vốn ODA" },
      { kr: "ODA 자금수여국", vi: "Nước nhận vốn ODA" },
    ]
  },
  {
    title: "IV. THUẾ – NGÂN SÁCH – BẢO HIỂM",
    items: [
      { kr: "정부예산", vi: "Ngân sách nhà nước" },
      { kr: "직접세", vi: "Thuế trực tiếp" },
      { kr: "간접세", vi: "Thuế gián tiếp" },
      { kr: "갑근세", vi: "Thuế thu nhập tiền lương" },
      { kr: "개인소득세", vi: "Thuế TNCN" },
      { kr: "가산세", vi: "Thuế phạt, thuế nộp thêm" },
      { kr: "토지사용권세", vi: "Thuế quyền sử dụng đất" },
      { kr: "사회보험", vi: "Bảo hiểm xã hội" },
      { kr: "의료보험", vi: "Bảo hiểm y tế" },
      { kr: "고용보험", vi: "Bảo hiểm thất nghiệp" },
      { kr: "최저임금", vi: "Lương tối thiểu" },
    ]
  },
  {
    title: "V. GIAO DỊCH – THỊ TRƯỜNG – THƯƠNG MẠI",
    items: [
      { kr: "거래", vi: "Giao dịch" },
      { kr: "거래소", vi: "Sàn giao dịch" },
      { kr: "거래액", vi: "Kim ngạch giao dịch" },
      { kr: "거래량", vi: "Lượng giao dịch" },
      { kr: "거래대금", vi: "Giá trị giao dịch" },
      { kr: "거래처", vi: "Đối tác giao dịch" },
      { kr: "거래날짜", vi: "Ngày giao dịch" },
      { kr: "가격", vi: "Giá" },
      { kr: "가격인상", vi: "Tăng giá" },
      { kr: "가격인하", vi: "Giảm giá" },
      { kr: "가격결정회의", vi: "Họp định giá" },
      { kr: "공개매수", vi: "Mua công khai" },
      { kr: "경매", vi: "Đấu giá" },
      { kr: "경품 / 경품권", vi: "Hàng / quyền đấu giá" },
      { kr: "거품", vi: "Bong bóng kinh tế" },
    ]
  },
  {
    title: "VI. QUẢN LÝ – KẾ TOÁN – HỢP ĐỒNG",
    items: [
      { kr: "경영", vi: "Kinh doanh / quản lý" },
      { kr: "경영자", vi: "Nhà quản lý" },
      { kr: "경영진", vi: "Ban giám đốc" },
      { kr: "경영분석", vi: "Phân tích kinh doanh" },
      { kr: "경영결과", vi: "Kết quả kinh doanh" },
      { kr: "경영협력계약", vi: "HĐ hợp tác kinh doanh" },
      { kr: "계약", vi: "Hợp đồng" },
      { kr: "계약체결", vi: "Ký hợp đồng" },
      { kr: "계약금", vi: "Tiền đặt cọc" },
      { kr: "계약종료", vi: "Kết thúc hợp đồng" },
      { kr: "결산", vi: "Quyết toán" },
      { kr: "결제", vi: "Thanh toán" },
      { kr: "계산서", vi: "Hóa đơn" },
      { kr: "계좌", vi: "Tài khoản" },
      { kr: "계좌번호", vi: "Số tài khoản" },
      { kr: "경리", vi: "Kế toán – tài vụ" },
      { kr: "경리부장", vi: "Kế toán trưởng" },
    ]
  },
  {
    title: "VII. XÃ HỘI – TIÊU DÙNG – ĐỜI SỐNG",
    items: [
      { kr: "빈곤선", vi: "Chuẩn nghèo" },
      { kr: "가난가구", vi: "Hộ nghèo" },
      { kr: "빈부격차", vi: "Chênh lệch giàu nghèo" },
      { kr: "생필품", vi: "Hàng tiêu dùng thiết yếu" },
      { kr: "대량소비", vi: "Tiêu dùng đại trà" },
      { kr: "문화유흥", vi: "Văn hóa – giải trí" },
      { kr: "공공서비스", vi: "Dịch vụ công" },
      { kr: "공공요금", vi: "Phí công cộng" },
    ]
  }
];

export default function KinhTeVocabPage() {
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
            <Lock size={12} className="text-white" /> HDP SECURE READER
          </div>
        </div>
      </nav>

      <header className="bg-[#a62a26] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
          <TrendingUp size={400} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <PieChart size={14} />
            CHUYÊN ĐỀ KINH TẾ & TÀI CHÍNH
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Từ Vựng Tiếng Hàn Kinh Tế
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-light">
            Tổng hợp thuật ngữ vĩ mô, tài chính ngân hàng và quản trị doanh nghiệp chuyên sâu.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6" onCopy={(e) => e.preventDefault()}>
        <div className="space-y-16">
          {KINH_TE_DATA.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-white text-[#a62a26] rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                  {idx + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#a62a26] tracking-tight">
                  {section.title}
                </h2>
                <div className="flex-grow h-px bg-slate-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex flex-col p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-[#a62a26]/40 hover:bg-[#a62a26]/5 transition-all group">
                    <span className="text-lg font-bold text-[#a62a26] group-hover:text-[#a62a26]">{item.kr}</span>
                    <span className="text-sm text-[#a62a26]/80 font-medium border-t border-slate-100 mt-2 pt-1">{item.vi}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-12 border-t border-[#a62a26]/20 text-center">
          <div className="bg-[#a62a26] p-8 rounded-3xl border border-[#a62a26]/40 flex flex-col items-center">
            <ShieldCheck size={40} className="text-white mb-4 opacity-80" />
            <p className="text-white font-black uppercase tracking-widest text-sm">HDP EDU PROPRIETARY CONTENT</p>
            <p className="text-white/80 text-xs mt-2 max-w-sm">
              Tài liệu chuyên môn cao cấp. Mọi hành vi sao chép hoặc trích dẫn trái phép sẽ bị xử lý theo quy định của trung tâm.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
