import React from 'react';
import { Phone, ShoppingCart } from 'lucide-react';
import Logo from '../../img/Logo.png'
import Foto1 from '../../img/photo_2025-08-21_17-52-53.jpg'
import Foto2 from '../../img/photo_2025-08-21_17-52-54.jpg'
import Foto3 from '../../img/photo_2025-08-21_17-52-55.jpg'

export default function Home() {
    const products = [
        {
            id: 1,
            name: "Pudra",
            price: "12,990 so'm",
            image: Foto1,
            isNew: true
        },
        {
            id: 2,
            name: "Kiprik",
            price: "24,990 so'm",
            image: Foto2,
            isHot: true
        },
        {
            id: 3,
            name: "Dazmol gafri",
            price: "3,990 so'm",
            image: Foto3,
            isNew: false
        }
    ];

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-50" style={{ backgroundColor: '#202a34' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                <img className='w-[140px]' src={Logo} alt="" />
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors relative">
                                <Phone className="w-5 h-5" style={{ color: '#fef3e0' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Products Section */}
            <section className="py-20 h-[100%]" style={{ backgroundColor: '#202a34' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border hover:border-purple-400 hover:-translate-y-2" style={{ backgroundColor: '#2a3744', borderColor: '#374151' }}>
                                {/* Badges */}

                                {/* Product Image */}
                                <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-700 to-gray-800">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="space-y-4">
                                    {/* Product Name */}
                                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors" style={{ color: '#fef3e0' }}>
                                        {product.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl font-bold" style={{ color: '#fef3e0' }}>
                                            {product.price}
                                        </span>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Savatga qo‘shish</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
