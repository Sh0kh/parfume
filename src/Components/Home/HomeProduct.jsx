import { Phone, ShoppingCart } from 'lucide-react';
import Logo from '../../img/Logo.png'
import { NavLink } from 'react-router-dom';

export default function HomeProduct() {
    const products = [
        {
            id: 1,
            name: "MAC Matte Lipstick Red Rock 0.1",
            price: "25 000 so'm",
            image: 'https://m.media-amazon.com/images/I/516A-vyh2lL._UF1000,1000_QL80_.jpg',
            isNew: true
        },
        {
            id: 2,
            name: "RENEE Stunner Matte Lipstick, 4Gm",
            price: "10 000 so'm",
            image: 'https://www.reneecosmetics.in/cdn/shop/files/8906121645491_1_c8d144f0-e818-4c32-80bf-75f13f1ba956.jpg?v=1742483477&width=1946',
            isHot: true
        },
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
                                <img className='w-[140px] ' src={Logo} alt="" />
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
            <section className="pt-10 min-h-screen" style={{ backgroundColor: '#202a34' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <NavLink to={`/homeProduct`}>
                                <div key={product.id} className="group relative rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border hover:border-purple-400 hover:-translate-y-2" style={{ backgroundColor: '#2a3744', borderColor: '#374151' }}>
                                    {/* Badges */}

                                    {/* Product Image */}
                                    <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-700 to-gray-800">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-64 object- group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="space-y-4">
                                        {/* Product Name */}
                                        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors" style={{ color: '#fef3e0' }}>
                                            {product.name}
                                        </h3>
                                        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors" style={{ color: '#fef3e0' }}>
                                            {product.price}
                                        </h3>
                                        {/* Add to Cart Button */}
                                        <NavLink to={`/buyProduct`}>
                                            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>Sotib olish</span>
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
