import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

interface CartItem {
    quantity: number;
    product: {
        productName: string;
        price: number;
        images: { imageUrl: string; isThumbnail: boolean }[];
    };
}

export default function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        note: '',
    });

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
            const items = response.data.cartItems || [];

            if (items.length === 0) {
                navigate('/cart');
                return;
            }

            setCartItems(items);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.phone || !formData.address) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            setSubmitting(true);
            await api.post('/orders', formData);
            alert('Đặt hàng thành công!');
            navigate('/orders');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setSubmitting(false);
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
                    <div className="animate-pulse">
                        <div className="h-8 w-48 bg-stone-200 rounded mb-8"></div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="h-64 bg-stone-200 rounded-lg"></div>
                            </div>
                            <div className="h-96 bg-stone-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Thanh toán</h1>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h2 className="text-xl font-display font-semibold mb-6">Thông tin giao hàng</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Số điện thoại <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="input-field"
                                        placeholder="0123456789"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Địa chỉ giao hàng <span className="text-red-600">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="input-field resize-none"
                                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ghi chú (không bắt buộc)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.note}
                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                        className="input-field resize-none"
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h2 className="text-xl font-display font-semibold mb-6">Phương thức thanh toán</h2>

                            <div className="space-y-3">
                                <label className="flex items-center p-4 border-2 border-primary-600 rounded-lg cursor-pointer bg-primary-50">
                                    <input type="radio" name="payment" defaultChecked className="mr-3" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</div>
                                        <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="card p-6 sticky top-24">
                            <h2 className="text-xl font-display font-semibold mb-6">Đơn hàng của bạn</h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cartItems.map((item, index) => {
                                    const thumbnail = item.product.images.find((img) => img.isThumbnail) || item.product.images[0];
                                    return (
                                        <div key={index} className="flex gap-3">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                                                {thumbnail && (
                                                    <img
                                                        src={`http://localhost:3004${thumbnail.imageUrl}`}
                                                        alt={item.product.productName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm line-clamp-2">{item.product.productName}</h4>
                                                <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-primary-700">
                                                    {formatPrice(Number(item.product.price) * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-stone-200 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    <span className="font-semibold">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-semibold text-green-600">Miễn phí</span>
                                </div>
                                <div className="border-t border-stone-200 pt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Tổng cộng</span>
                                        <span className="text-primary-700">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {submitting ? (
                                    'Đang xử lý...'
                                ) : (
                                    <>
                                        <Package className="w-5 h-5 mr-2" />
                                        Đặt hàng
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Bằng cách đặt hàng, bạn đồng ý với{' '}
                                <a href="#" className="text-primary-600 hover:underline">Điều khoản sử dụng</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}