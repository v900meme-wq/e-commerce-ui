import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, HeadphonesIcon } from 'lucide-react';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-50 via-gold-50 to-stone-50 py-20 md:py-32 overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 vietnamese-pattern opacity-30"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block mb-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                ✨ Khuyến mãi đặc biệt
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
                                Nét Đẹp
                                <span className="block text-primary-600">Truyền Thống</span>
                                <span className="block text-gold-600">Việt Nam</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Khám phá những sản phẩm thủ công tinh xảo, mang đậm bản sắc văn hóa dân gian.
                                Chất lượng tốt nhất, giá cả hợp lý.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/products" className="btn-primary inline-flex items-center">
                                    Mua sắm ngay
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link to="/about" className="btn-outline inline-flex items-center">
                                    Tìm hiểu thêm
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="mt-12 grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-3xl font-bold text-primary-600">1000+</div>
                                    <div className="text-sm text-gray-600">Sản phẩm</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary-600">5000+</div>
                                    <div className="text-sm text-gray-600">Khách hàng</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary-600">4.9★</div>
                                    <div className="text-sm text-gray-600">Đánh giá</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80"
                                    alt="Vietnamese traditional products"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-400 rounded-full opacity-20 blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-400 rounded-full opacity-20 blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                <Shield className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-display font-semibold text-lg mb-2">Chất Lượng Đảm Bảo</h3>
                            <p className="text-gray-600 text-sm">Sản phẩm chính hãng 100%</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                <Truck className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-display font-semibold text-lg mb-2">Giao Hàng Nhanh</h3>
                            <p className="text-gray-600 text-sm">Miễn phí từ 500.000đ</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                <Star className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-display font-semibold text-lg mb-2">Đánh Giá Cao</h3>
                            <p className="text-gray-600 text-sm">Hơn 5000 đánh giá 5 sao</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                <HeadphonesIcon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-display font-semibold text-lg mb-2">Hỗ Trợ 24/7</h3>
                            <p className="text-gray-600 text-sm">Luôn sẵn sàng tư vấn</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Danh Mục Sản Phẩm</h2>
                        <p className="text-gray-600 mt-4">Khám phá bộ sưu tập đa dạng của chúng tôi</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Gốm Sứ', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80', color: 'from-primary-500 to-primary-600' },
                            { name: 'Đồ Gỗ', image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400&q=80', color: 'from-wood-500 to-wood-600' },
                            { name: 'Tranh Thêu', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80', color: 'from-gold-500 to-gold-600' },
                            { name: 'Lưu Niệm', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&q=80', color: 'from-primary-400 to-gold-500' },
                        ].map((category, index) => (
                            <Link
                                key={index}
                                to="/products"
                                className="group card overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden relative">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-70 transition-opacity duration-300`}></div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-display font-semibold text-lg text-center">{category.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Đăng Ký Nhận Ưu Đãi
                    </h2>
                    <p className="text-xl mb-8 text-primary-100">
                        Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên
                    </p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-gold-400"
                        />
                        <button className="bg-gold-500 hover:bg-gold-600 px-8 py-4 rounded-lg font-semibold transition-colors">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}