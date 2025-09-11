import React, { useEffect, useState } from "react";
import Logo from "../../img/Logo.png";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../utils/Alert";
import CONFIG from "../../utils/Config";
import Photo from '../../img/Photo.jpg'


export default function ProductBuy() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        phone: "+998",
        quantity: 1,
        info: "",
    });

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/v1/product/getOne/${id}`);
            setData(response?.data?.object || null);
        } catch (error) {
            console.log(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const orderPayload = {
            orderDate: new Date().toISOString().split("T")[0],
            count: Number(formData.quantity),
            phoneNumber: formData.phone,
            fullName: formData.name,
            productId: Number(id),

        };

        try {
            await axios.post(`/api/v1/order/create`, orderPayload);
            Alert("Buyurtmangiz qabul qilindi!", "success");
            setFormData({ name: "", phone: "", quantity: 1, info: "" });
        } catch (error) {
            console.error(error);
            Alert(`Xatolik: ${error}`, "error");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-50" style={{ backgroundColor: "#202a34" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <NavLink to={'/'}>
                            <div className="flex-shrink-0">
                                <img className="w-[140px]" src={Logo} alt="logo" />
                            </div>
                        </NavLink>
                        <button
                            onClick={() => navigate(-1)}
                            className={` bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform transition-all duration-300 ${btnLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                                }`}
                        >
                            Ortga
                        </button>
                    </div>
                </div>
            </header>

            {/* Section */}
            <section className="py-10 min-h-screen" style={{ backgroundColor: "#202a34" }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        // Loading Spinner
                        <div className="flex justify-center items-center h-60">
                            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-purple-500"></div>
                        </div>
                    ) : !data ? (
                        // No Data
                        <div className="flex flex-col items-center justify-center h-60 text-center space-y-3">
                            <div className="text-6xl">😕</div>
                            <p className="text-lg text-gray-300">Mahsulot topilmadi yoki mavjud emas</p>
                        </div>
                    ) : (
                        <>
                            {/* Product Card */}
                            <div
                                className="group relative rounded-3xl p-6 mb-10 border hover:border-purple-400 hover:shadow-2xl transition-all duration-500"
                                style={{ backgroundColor: "#2a3744", borderColor: "#374151" }}
                            >
                                <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-700 to-gray-800">
                                    <img
                                        src={data?.files[0]?.id ? CONFIG.API_URL + data.files[0].id : Photo}
                                        alt={data?.name}
                                        onError={(e) => {
                                            e.currentTarget.src = Photo; // если ошибка загрузки
                                        }}
                                        className="w-full h-80 object-contain group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h3
                                        className="text-2xl font-bold group-hover:text-purple-400 transition-colors"
                                        style={{ color: "#fef3e0" }}
                                    >
                                        {data?.name}
                                    </h3>
                                    <p className="text-lg font-semibold" style={{ color: "#fef3e0" }}>
                                        {data?.price ? `${Number(data.price).toLocaleString("ru-RU")} so‘m` : "Цена не указана"}
                                    </p>
                                </div>
                            </div>

                            {/* Order Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 bg-[#2a3744] rounded-3xl p-6 shadow-lg border border-gray-700"
                            >
                                <h2 className="text-xl font-bold mb-4" style={{ color: "#fef3e0" }}>
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
                                    disabled={btnLoading}
                                    className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform transition-all duration-300 ${btnLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                                        }`}
                                >
                                    {btnLoading ? "Yuborilmoqda..." : "Buyurtma berish"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
