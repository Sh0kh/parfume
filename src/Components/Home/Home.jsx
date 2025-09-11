import React, { useEffect, useState } from 'react';
import { Phone, PackageOpen } from 'lucide-react';
import Logo from '../../img/Logo.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CONFIG from '../../utils/Config';
import Photo from '../../img/Photo.jpg'

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllCategory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/categories`);
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-50" style={{ backgroundColor: '#202a34' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                <img className="w-[140px]" src={Logo} alt="Logo" />
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <a
                                href="tel:+998901234567" // сюда свой номер
                                className="p-2 hover:bg-gray-700 rounded-full transition-colors relative inline-flex items-center justify-center"
                            >
                                <Phone className="w-5 h-5" style={{ color: '#fef3e0' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            {/* Products Section */}
            <section className="py-10 min-h-screen" style={{ backgroundColor: '#202a34' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        // 🔄 Loading skeletons
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-3xl p-6 animate-pulse"
                                    style={{ backgroundColor: '#2a3744' }}
                                >
                                    <div className="h-64 w-full rounded-2xl bg-gray-700 mb-6"></div>
                                    <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : data.length === 0 ? (
                        // ❌ No data
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <PackageOpen className="w-16 h-16 text-gray-400" />
                            <h2 className="text-xl font-semibold text-gray-300">
                                Kategoriya topilmadi
                            </h2>
                            <p className="text-gray-400">
                                Hozircha kategoriyalar mavjud emas, keyinroq urinib ko‘ring.
                            </p>
                        </div>
                    ) : (
                        // ✅ Data
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data?.map((product) => (
                                <NavLink key={product.id} to={`/product/${product.id}`}>
                                    <div
                                        className="group relative rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border hover:border-purple-400 hover:-translate-y-2"
                                        style={{
                                            backgroundColor: '#2a3744',
                                            borderColor: '#374151',
                                        }}
                                    >
                                        {/* Product Image */}
                                        <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-700 to-gray-800">
                                            <img
                                                src={product?.file?.id ? CONFIG.API_URL + product.file.id : Photo}
                                                alt={product?.name}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.currentTarget.src = Photo; // если ошибка загрузки
                                                }}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="space-y-4">
                                            <h3
                                                className="text-xl font-bold group-hover:text-purple-400 transition-colors"
                                                style={{ color: '#fef3e0' }}
                                            >
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
