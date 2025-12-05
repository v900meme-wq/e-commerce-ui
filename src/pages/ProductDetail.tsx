import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Heart, Share2, ArrowLeft } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

interface Product {
    id: number;
    productName: string;
    price: number;
    stockQuantity: number;
    description: string;
    images: { imageUrl: string; isThumbnail: boolean; sortOrder: number }[];
    category: { categoryName: string };
}

export default function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [slug]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/slug/${slug}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/carts/items', {
                productId: product?.id,
                quantity,
            });
            alert('Đã thêm vào giỏ hàng!');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 w-32 bg-stone-200 rounded mb-8"></div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="aspect-square bg-stone-200 rounded-xl"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-stone-200 rounded w-3/4"></div>
                                <div className="h-6 bg-stone-200 rounded w-1/4"></div>
                                <div className="h-12 bg-stone-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-stone-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xl text-gray-600">Không tìm thấy sản phẩm</p>
                </div>
            </div>
        );
    }

    const sortedImages = [...product.images].sort((a, b) => a.sortOrder - b.sortOrder);

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-4">
                {/* Back button */}
                <button
                    onClick={() => navigate('/products')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Quay lại</span>
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
                            {sortedImages.length > 0 ? (
                                <img
                                    src={`http://localhost:3004${sortedImages[selectedImage]?.imageUrl}`}
                                    alt={product.productName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        {sortedImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {sortedImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                                ? 'border-primary-600 shadow-lg'
                                                : 'border-transparent hover:border-stone-300'
                                            }`}
                                    >
                                        <img
                                            src={`http://localhost:3004${img.imageUrl}`}
                                            alt={`${product.productName} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                                {product.category.categoryName}
                            </div>
                            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                                {product.productName}
                            </h1>
                            <div className="flex items-baseline space-x-4">
                                <div className="text-4xl font-bold text-primary-700">
                                    {formatPrice(product.price)}
                                </div>
                            </div>
                            <p className="text-gray-600 mt-2">
                                {product.stockQuantity > 0 ? (
                                    <span className="text-green-600 font-medium">✓ Còn hàng ({product.stockQuantity} sản phẩm)</span>
                                ) : (
                                    <span className="text-red-600 font-medium">✗ Hết hàng</span>
                                )}
                            </p>
                        </div>

                        {/* Quantity */}
                        {product.stockQuantity > 0 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-stone-300 hover:border-primary-600 flex items-center justify-center transition-colors"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, parseInt(e.target.value) || 1)))}
                                            className="w-20 text-center px-4 py-2 border-2 border-stone-300 rounded-lg focus:border-primary-500 focus:outline-none"
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-stone-300 hover:border-primary-600 flex items-center justify-center transition-colors"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={addToCart} className="flex-1 btn-primary flex items-center justify-center">
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Thêm vào giỏ
                                    </button>
                                    <button className="w-12 h-12 border-2 border-stone-300 hover:border-primary-600 rounded-lg flex items-center justify-center transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 border-2 border-stone-300 hover:border-primary-600 rounded-lg flex items-center justify-center transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="border-t border-b border-stone-200 py-6 space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <span className="text-primary-600">✓</span>
                                </div>
                                <span className="text-gray-700">Chất lượng đảm bảo</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <span className="text-primary-600">🚚</span>
                                </div>
                                <span className="text-gray-700">Giao hàng toàn quốc</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <span className="text-primary-600">🔄</span>
                                </div>
                                <span className="text-gray-700">Đổi trả trong 7 ngày</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-display font-semibold mb-4">Mô tả sản phẩm</h3>
                            <div
                                className="prose prose-stone max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}