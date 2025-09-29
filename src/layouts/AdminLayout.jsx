import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../Components/UI/SideBar/SideBar";
import AdminHeader from "../Components/UI/Header/AdminHeader";



export default function AdminLayout() {

    const [active, setActive] = useState(false)




    return (
        <div className="flex w-[100%] overflow-hidden  bg-[#FAFAFA] relative">
            <Sidebar open={active} onClose={() => setActive(false)} />
            <div className="md:ml-[310px] mt-[100px] w-full min-h-screen">
                <AdminHeader active={() => setActive(!active)} />
                <Outlet />
            </div>
        </div>
    )
}