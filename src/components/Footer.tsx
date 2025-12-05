import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-wood-900 text-stone-100 pt-16 pb-8 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-gold-500 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🏮</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-display font-bold text-white">Cửa Hàng</h3>
                                <p className="text-xs text-gold-400">Truyền Thống</p>
                            </div>
                        </div>
                        <p className="text-sm text-stone-300 mb-4">
                            Mang đến những sản phẩm truyền thống Việt Nam chất lượng cao,
                            giữ gìn nét đẹp văn hóa dân gian.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-10 h-10 bg-wood-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-wood-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-display font-semibold text-gold-400 mb-4">Liên kết</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-stone-300 hover:text-gold-400 transition-colors">Trang chủ</Link></li>
                            <li><Link to="/products" className="text-stone-300 hover:text-gold-400 transition-colors">Sản phẩm</Link></li>
                            <li><Link to="/about" className="text-stone-300 hover:text-gold-400 transition-colors">Giới thiệu</Link></li>
                            <li><Link to="/contact" className="text-stone-300 hover:text-gold-400 transition-colors">Liên hệ</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="text-lg font-display font-semibold text-gold-400 mb-4">Chính sách</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-stone-300 hover:text-gold-400 transition-colors">Chính sách đổi trả</a></li>
                            <li><a href="#" className="text-stone-300 hover:text-gold-400 transition-colors">Chính sách bảo mật</a></li>
                            <li><a href="#" className="text-stone-300 hover:text-gold-400 transition-colors">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="text-stone-300 hover:text-gold-400 transition-colors">Hướng dẫn mua hàng</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-display font-semibold text-gold-400 mb-4">Liên hệ</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-stone-300">123 Đường Lê Lợi, Quận 1, TP.HCM</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                                <span className="text-sm text-stone-300">0123 456 789</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                                <span className="text-sm text-stone-300">info@cuahang.vn</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-wood-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-stone-400">
                            © 2024 Cửa Hàng Truyền Thống. All rights reserved.
                        </p>
                        <p className="text-sm text-stone-400">
                            Made with ❤️ in Vietnam
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}