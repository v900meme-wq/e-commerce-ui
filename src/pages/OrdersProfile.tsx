import { useState, useEffect } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Order {
    id: number;
    phone: string;
    address: string;
    totalAmount: number;
    status: string;
    note: string;
    createdAt: string;
    orderItems: {
        productName: string;
        price: number;
        quantity: number;
    }[];
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
    pending: { label: 'Chờ xác nhận', icon: Clock, color: 'text-yellow-600 bg-yellow-100' },
    confirmed: { label: 'Đã xác nhận', icon: CheckCircle, color: 'text-blue-600 bg-blue-100' },
    shipping: { label: 'Đang giao', icon: Truck, color: 'text-purple-600 bg-purple-100' },
    delivered: { label: 'Đã giao', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'text-red-600 bg-red-100' },
};

export function Orders() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await api.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-48 bg-stone-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Đơn hàng của bạn</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-20 card">
                        <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                            Chưa có đơn hàng nào
                        </h2>
                        <p className="text-gray-600 mb-8">Hãy mua sắm và tạo đơn hàng đầu tiên của bạn</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const statusInfo = statusConfig[order.status] || statusConfig.pending;
                            const StatusIcon = statusInfo.icon;

                            return (
                                <div key={order.id} className="card p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-display font-semibold">
                                                    Đơn hàng #{order.id}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusInfo.color}`}>
                                                    <StatusIcon className="w-4 h-4" />
                                                    <span>{statusInfo.label}</span>
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Đặt ngày {formatDate(order.createdAt)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-primary-700">
                                                {formatPrice(order.totalAmount)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-stone-200 pt-4 space-y-3">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-gray-700">
                                                    {item.productName} x {item.quantity}
                                                </span>
                                                <span className="font-semibold text-gray-900">
                                                    {formatPrice(Number(item.price) * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-stone-200 pt-4 mt-4 grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600 mb-1">Số điện thoại:</p>
                                            <p className="font-medium">{order.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 mb-1">Địa chỉ giao hàng:</p>
                                            <p className="font-medium">{order.address}</p>
                                        </div>
                                        {order.note && (
                                            <div className="md:col-span-2">
                                                <p className="text-gray-600 mb-1">Ghi chú:</p>
                                                <p className="font-medium">{order.note}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Tài khoản của bạn</h1>

                <div className="card p-8">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl text-white font-bold">
                                {user.email[0].toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-2xl font-display font-semibold text-center text-gray-900">
                            {user.email}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/orders')}
                            className="w-full btn-outline text-left flex items-center justify-between"
                        >
                            <span>Đơn hàng của tôi</span>
                            <Package className="w-5 h-5" />
                        </button>

                        <button
                            onClick={logout}
                            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}