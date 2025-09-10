import { PackageOpen, Phone, ShoppingCart } from "lucide-react";
import Logo from "../../img/Logo.png";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomeProduct() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const getProduct = async (pageNumber = 0) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `/api/v1/product/getAll?size=6&page=${pageNumber}&categoryId=${id}`
            );
            setData(response?.data?.object?.content || []);
            setPage(response?.data?.object?.pageable?.pageNumber || 0);
            setTotalPages(response?.data?.object?.totalPages || 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct(0);
    }, [id]);

    return (
        <>
            {/* Header */}
            <header
                className="sticky top-0 z-50"
                style={{ backgroundColor: "#202a34" }}
            >
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
                            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors relative">
                                <Phone className="w-5 h-5" style={{ color: "#fef3e0" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Products Section */}
            <section
                className="py-10 min-h-screen"
                style={{ backgroundColor: "#202a34" }}
            >
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
                                Tavar topilmadi
                            </h2>
                            <p className="text-gray-400">
                                Hozircha tavar mavjud emas, keyinroq urinib ko‘ring.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data?.map((product) => (
                                    <div
                                        className="group relative rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border hover:border-purple-400 hover:-translate-y-2"
                                        style={{
                                            backgroundColor: "#2a3744",
                                            borderColor: "#374151",
                                        }}
                                    >
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
                                            <h3
                                                className="text-xl font-bold group-hover:text-purple-400 transition-colors"
                                                style={{ color: "#fef3e0" }}
                                            >
                                                {product.name}
                                            </h3>
                                            <h3
                                                className="text-xl font-bold group-hover:text-purple-400 transition-colors"
                                                style={{ color: "#fef3e0" }}
                                            >
                                                {product.price} so‘m
                                            </h3>
                                            {/* Add to Cart Button */}
                                            <NavLink to={`/buyProduct/${product.id}`}>
                                                <button className="w-full mt-[10px] bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                                                    <ShoppingCart className="w-5 h-5" />
                                                    <span>Sotib olish</span>
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-4 mt-10">
                                <button
                                    disabled={page === 0}
                                    onClick={() => getProduct(page - 1)}
                                    className={`px-4 py-2 rounded-lg transition ${page === 0
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-purple-600 hover:bg-purple-700 text-white"
                                        }`}
                                >
                                    Oldingi
                                </button>
                                <span className="text-white">
                                    {page + 1} / {totalPages}
                                </span>
                                <button
                                    disabled={page + 1 === totalPages}
                                    onClick={() => getProduct(page + 1)}
                                    className={`px-4 py-2 rounded-lg transition ${page + 1 === totalPages
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-purple-600 hover:bg-purple-700 text-white"
                                        }`}
                                >
                                    Keyingi
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section >
        </>
    );
}
