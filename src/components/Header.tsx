import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-primary-600">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2">
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>🎉 Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-gold-500 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                            <span className="text-2xl text-white font-bold">🏮</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-primary-700">
                                Cửa Hàng Truyền Thống
                            </h1>
                            <p className="text-xs text-gold-600 font-medium">Nét đẹp Việt Nam</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="nav-link font-medium text-gray-700 hover:text-primary-600 transition-colors">
                            Trang chủ
                        </Link>
                        <Link to="/products" className="nav-link font-medium text-gray-700 hover:text-primary-600 transition-colors">
                            Sản phẩm
                        </Link>
                        <Link to="/about" className="nav-link font-medium text-gray-700 hover:text-primary-600 transition-colors">
                            Giới thiệu
                        </Link>
                        <Link to="/contact" className="nav-link font-medium text-gray-700 hover:text-primary-600 transition-colors">
                            Liên hệ
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 hover:bg-stone-100 rounded-lg transition-colors">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        {user ? (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-stone-100 rounded-lg transition-colors">
                                    <User className="w-5 h-5 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-700">{user.email}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                                    title="Đăng xuất"
                                >
                                    <LogOut className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link to="/login" className="btn-outline px-4 py-2 text-sm">
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="btn-primary px-4 py-2 text-sm">
                                    Đăng ký
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-stone-100 rounded-lg"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-stone-200">
                        <nav className="flex flex-col space-y-3">
                            <Link to="/" className="px-4 py-2 hover:bg-stone-100 rounded-lg">Trang chủ</Link>
                            <Link to="/products" className="px-4 py-2 hover:bg-stone-100 rounded-lg">Sản phẩm</Link>
                            <Link to="/about" className="px-4 py-2 hover:bg-stone-100 rounded-lg">Giới thiệu</Link>
                            <Link to="/contact" className="px-4 py-2 hover:bg-stone-100 rounded-lg">Liên hệ</Link>

                            {user ? (
                                <>
                                    <Link to="/profile" className="px-4 py-2 hover:bg-stone-100 rounded-lg">
                                        Tài khoản
                                    </Link>
                                    <button onClick={logout} className="px-4 py-2 text-left hover:bg-stone-100 rounded-lg">
                                        Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 hover:bg-stone-100 rounded-lg">
                                        Đăng nhập
                                    </Link>
                                    <Link to="/register" className="px-4 py-2 hover:bg-stone-100 rounded-lg">
                                        Đăng ký
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}