import { MapPin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-[#a62a26] dark:bg-[#000814]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-8 text-left">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-black text-white mb-2">HDP EDU</h2>
            <div className="w-12 h-1 bg-white/30 rounded-full mb-3"></div>
            <p className="text-sm text-white/80 leading-relaxed">
              Nền tảng học trực tuyến chất lượng cao để chuẩn bị sự nghiệp tại Hàn Quốc
            </p>
          </div>

          {/* Program */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Chương Trình</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-white/80 hover:text-white transition-colors">
                  ✓ Chuẩn SEO
                </span>
              </li>
              <li>
                <span className="text-sm text-white/80 hover:text-white transition-colors">
                  ✓ Tiếng Hàn Thực Tế
                </span>
              </li>
              <li>
                <span className="text-sm text-white/80 hover:text-white transition-colors">
                  ✓ Văn Hóa Doanh Nghiệp
                </span>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/80">
                  Tầng 4, tòa SHG số 8 Quang Trung, Hà Đông, Hà Nội
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Section */}
        <div className="flex md:flex-row flex-col justify-between items-center py-6 gap-4">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} HDP EDU. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
              Chính Sách Bảo Mật
            </a>
            <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
              Điều Khoản Sử Dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
