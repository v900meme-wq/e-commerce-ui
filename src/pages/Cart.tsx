import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        productName: string;
        price: number;
        slug: string;
        images: { imageUrl: string; isThumbnail: boolean }[];
    };
}

export default function Cart() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchCart();
    }, [user]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await api.get('/carts');
            setCartItems(response.data.cartItems || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        try {
            await api.patch(`/carts/items/${itemId}`, { quantity });
            fetchCart();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const removeItem = async (itemId: number) => {
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

        try {
            await api.delete(`/carts/items/${itemId}`);
            fetchCart();
        } catch (error) {
            alert('Có lỗi xảy ra');
        }
    };

    const clearCart = async () => {
        if (!confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) return;

        try {
            await api.delete('/carts');
            fetchCart();
        } catch (error) {
            alert('Có lỗi xảy ra');
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const total = cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-stone-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                        Giỏ hàng trống
                    </h2>
                    <p className="text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                    <Link to="/products" className="btn-primary inline-block">
                        Mua sắm ngay
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-display font-bold text-gray-900">Giỏ hàng của bạn</h1>
                    <button onClick={clearCart} className="text-red-600 hover:text-red-700 font-medium">
                        Xóa tất cả
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => {
                            const thumbnail = item.product.images.find((img) => img.isThumbnail) || item.product.images[0];
                            return (
                                <div key={item.id} className="card p-4">
                                    <div className="flex gap-4">
                                        <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-stone-100">
                                                {thumbnail ? (
                                                    <img
                                                        src={`http://localhost:3000${thumbnail.imageUrl}`}
                                                        alt={item.product.productName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        <div className="flex-1 min-w-0">
                                            <Link to={`/products/${item.product.slug}`}>
                                                <h3 className="font-display font-semibold text-lg mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                                                    {item.product.productName}
                                                </h3>
                                            </Link>
                                            <div className="text-xl font-bold text-primary-700 mb-4">
                                                {formatPrice(item.product.price)}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-8 h-8 rounded border-2 border-stone-300 hover:border-primary-600 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded border-2 border-stone-300 hover:border-primary-600 flex items-center justify-center transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-700 p-2"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h3 className="text-xl font-display font-semibold mb-6">Tóm tắt đơn hàng</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                                    <span className="font-semibold">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-semibold text-green-600">Miễn phí</span>
                                </div>
                                <div className="border-t border-stone-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Tổng cộng</span>
                                        <span className="text-primary-700">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link to="/checkout" className="btn-primary w-full block text-center">
                                Thanh toán
                            </Link>

                            <Link to="/products" className="block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium">
                                ← Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}