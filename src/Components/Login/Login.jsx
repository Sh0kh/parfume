import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../utils/axios";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const body = {
                email: formData.email,
                password: formData.password,
            };
            let res;
            if (isLogin) {
                res = await axios.post("/login", body, {
                    headers: { "Content-Type": "application/json" }
                });
            } else {
                res = await axios.post("/register", body, {
                    headers: { "Content-Type": "application/json" }
                });
            }
            if (res.data && res.data.success && res.data.data) {
                localStorage.setItem("access_token", res.data.data.access_token);
                localStorage.setItem("refresh_token", res.data.data.refresh_token);
                localStorage.setItem("user", JSON.stringify(res.data.data.user));
                // TODO: Sahifani o'zgartirish yoki modalni yopish
            }
        } catch (error) {
            console.error("Auth error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-gray-900 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? "login-panel" : "register-panel"}
                        initial={{ x: isLogin ? 0 : "100%" }}
                        animate={{ x: isLogin ? 0 : "100%" }}
                        exit={{ x: isLogin ? "100%" : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute top-0 h-full w-1/2 bg-gradient-to-br from-green-500 to-green-700 text-white flex flex-col justify-center items-center p-8 z-10"
                    >
                        <h1 className="text-4xl font-bold mb-6">
                            {isLogin ? "Xush kelibsiz!" : "Yana xush kelibsiz!"}
                        </h1>
                        <p className="text-lg mb-8 opacity-90">
                            {isLogin
                                ? "Agar akkauntingiz bo'lmasa, ro'yxatdan o'ting"
                                : "Akkountingiz bormi? Kiring"}
                        </p>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="px-8 py-3 border-2 border-white rounded-full text-white hover:bg-white hover:text-green-600 transition-all duration-300 font-semibold"
                        >
                            {isLogin ? "Ro‘yxatdan o‘tish" : "Kirish"}
                        </button>
                    </motion.div>
                </AnimatePresence>

                <div
                    className={`flex-1 p-8 flex flex-col justify-center ${isLogin ? "pl-[50%]" : "pr-[50%]"
                        }`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? "login-form" : "register-form"}
                            initial={{ opacity: 0, x: isLogin ? 100 : -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isLogin ? -100 : 100 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-sm mx-auto w-full"
                        >
                            <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">
                                {isLogin ? "Kirish" : "Ro‘yxatdan o‘tish"}
                            </h2>

                            Saidamir, [12.08.2025 14:20]
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Parol"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-12 py-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {isLogin && (
                                    <div className="text-right">
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-green-400 text-sm"
                                        >
                                            Parolni unutdingizmi?
                                        </button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                                    disabled={loading}
                                >
                                    {loading ? "Yuklanmoqda..." : isLogin ? "Kirish" : "Ro‘yxatdan o‘tish"}
                                </button>
                            </form>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}