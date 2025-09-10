import React, { useEffect, useState } from "react";
import { $api } from "../../utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Alert } from "../../utils/Alert";

export default function Profile() {
    const [profile, setProfile] = useState({
        id: '',
        username: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const getProfile = async () => {
        try {
            const response = await $api.get("/api/v1/admin/getMe");
            setProfile({
                id: response?.data?.object?.id,
                username: response.data?.object?.username || "",
                password: "" // пароль не приходит → оставляем пустым
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const EditProfile = async () => {
        try {
            const response = await $api.put(`/api/v1/admin/update`, profile);
            Alert("Buyurtma muvaffaqiyatli o‘chirildi", "success");
        } catch (error) {
            console.log("Update error:", error);
            Alert(
                `Xatolik: ${error.response?.data?.message || error.message || "Server xatosi"
                }`,
                "error"
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        EditProfile();
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Profil</h2>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Login */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Login
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>

                    {/* Password with eye toggle */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Parol
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={profile.password}
                                onChange={handleChange}
                                className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Save button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        Saqlash
                    </button>
                </form>
            </div>
        </div>
    );
}
