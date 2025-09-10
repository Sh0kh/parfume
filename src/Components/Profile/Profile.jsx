import React, { useEffect, useState } from "react";
import { $api } from "../../utils";

export default function Profile() {
    const [profile, setProfile] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const getProfile = async () => {
        try {
            const response = await $api.get("/api/v1/admin/getMe");
            setProfile(response.data?.object || {});
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };


    useEffect(() => {
        getProfile()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profil yangilandi ✅");
    };

    return (
        <div className="min-h-screen flex justify-center items-center  p-6">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Profil</h2>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ism
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={profile.username}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon raqam
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Parol
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={profile.password}
                            onChange={handleChange}
                            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                        />
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
