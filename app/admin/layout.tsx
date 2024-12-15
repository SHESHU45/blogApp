import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col lg:flex-row min-h-screen">
                <ToastContainer theme="dark" />
                <Sidebar className="w-full lg:w-1/4" />
                <div className="flex flex-col flex-1 w-full">
                    <div className="flex items-center justify-between w-full py-3 px-4 sm:px-6 lg:px-12 border-b border-black bg-gray-50">
                        <h3 className="font-medium text-lg sm:text-xl">Admin Panel</h3>
                        <Image 
                            src={assets.profile_icon} 
                            width={40} 
                            height={40} 
                            alt="Profile Icon" 
                            className="rounded-full" 
                        />
                    </div>
                    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
