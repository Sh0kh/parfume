import React, { useState } from "react";
import Logo from "../../img/Logo.png";

export default function SalePage() {
    const product = {
        id: 1,
        name: "MAC Matte Lipstick Red Rock 0.1",
        price: "25 000 so'm",
        image:
            "https://m.media-amazon.com/images/I/516A-vyh2lL._UF1000,1000_QL80_.jpg",
        isNew: true,
    };

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        quantity: 1,
        info: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Buyurtma yuborildi:", formData);
        alert("Buyurtmangiz qabul qilindi ✅");
    };

    return (
        <>
            {/* Header */}
            <header
                className="sticky top-0 z-50"
                style={{ backgroundColor: "#202a34" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <img className="w-[140px]" src={Logo} alt="logo" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Product Section */}
            <section
                className="pt-10 min-h-screen"
                style={{ backgroundColor: "#202a34" }}
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Product Card */}
                    <div
                        className="group relative rounded-3xl p-6 mb-10 border hover:border-purple-400 hover:shadow-2xl transition-all duration-500"
                        style={{ backgroundColor: "#2a3744", borderColor: "#374151" }}
                    >
                        <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-700 to-gray-800">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-80 object-contain group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="space-y-3">
                            <h3
                                className="text-2xl font-bold group-hover:text-purple-400 transition-colors"
                                style={{ color: "#fef3e0" }}
                            >
                                {product.name}
                            </h3>
                            <p className="text-lg font-semibold" style={{ color: "#fef3e0" }}>
                                {product.price}
                            </p>
                        </div>
                    </div>

                    {/* Order Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-[#2a3744] rounded-3xl p-6 shadow-lg border border-gray-700"
                    >
                        <h2
                            className="text-xl font-bold mb-4"
                            style={{ color: "#fef3e0" }}
                        >
                            Buyurtma ma’lumotlari
                        </h2>

                        {/* Name */}
                        <div>
                            <label className="block text-sm mb-2" style={{ color: "#fef3e0" }}>
                                Ism
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl p-3 bg-[#202a34] border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                                placeholder="Ismingizni kiriting"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm mb-2" style={{ color: "#fef3e0" }}>
                                Telefon raqam
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl p-3 bg-[#202a34] border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                                placeholder="+998 XX XXX XX XX"
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm mb-2" style={{ color: "#fef3e0" }}>
                                Miqdor
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="1"
                                required
                                className="w-full rounded-xl p-3 bg-[#202a34] border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                                placeholder="Miqdorini kiriting"
                            />
                        </div>

                        {/* Info */}
                        <div>
                            <label className="block text-sm mb-2" style={{ color: "#fef3e0" }}>
                                Qo‘shimcha ma’lumot
                            </label>
                            <textarea
                                name="info"
                                value={formData.info}
                                onChange={handleChange}
                                rows="3"
                                className="w-full rounded-xl p-3 bg-[#202a34] border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                                placeholder="Qo‘shimcha ma’lumot yozing"
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            Buyurtma berish
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
