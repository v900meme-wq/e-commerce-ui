import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import api from '../lib/api';

interface Product {
    id: number;
    productName: string;
    price: number;
    slug: string;
    stockQuantity: number;
    images: { imageUrl: string; isThumbnail: boolean }[];
    category: { categoryName: string };
}

interface Category {
    id: number;
    categoryName: string;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [selectedCategory, search]);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params: any = { status: 'active' };
            if (selectedCategory) params.categoryId = selectedCategory;
            if (search) params.search = search;

            const response = await api.get('/products', { params });
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="section-title">Sản Phẩm</h1>
                    <p className="text-gray-600 mt-4">Khám phá bộ sưu tập đặc sắc của chúng tôi</p>
                </div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-stone-300 rounded-lg focus:border-primary-500 focus:outline-none"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === null
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-stone-100'
                                }`}
                        >
                            Tất cả
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.id
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-stone-100'
                                    }`}
                            >
                                {cat.categoryName}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="card animate-pulse">
                                <div className="aspect-square bg-stone-200"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-stone-200 rounded"></div>
                                    <div className="h-6 bg-stone-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">Không tìm thấy sản phẩm nào</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => {
                            const thumbnail = product.images.find((img) => img.isThumbnail) || product.images[0];
                            return (
                                <div key={product.id} className="card group">
                                    <Link to={`/products/${product.slug}`} className="block">
                                        <div className="aspect-square overflow-hidden bg-stone-100">
                                            {thumbnail ? (
                                                <img
                                                    src={`http://localhost:3004${thumbnail.imageUrl}`}
                                                    alt={product.productName}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                    </Link>

                                    <div className="p-4">
                                        <div className="text-sm text-primary-600 font-medium mb-1">
                                            {product.category.categoryName}
                                        </div>
                                        <Link to={`/products/${product.slug}`}>
                                            <h3 className="font-display font-semibold text-lg mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                                                {product.productName}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center justify-between mt-3">
                                            <div>
                                                <div className="text-2xl font-bold text-primary-700">
                                                    {formatPrice(product.price)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Còn {product.stockQuantity} sản phẩm
                                                </div>
                                            </div>
                                            <button className="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center transition-colors">
                                                <ShoppingCart className="w-5 h-5" />
                                            </button>
                                        </div>
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