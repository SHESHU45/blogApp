import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col bg-slate-100 h-screen">
            {/* Logo Section */}
            <div className="px-4 py-3 border border-black flex justify-center sm:justify-start">
                <Image src={assets.logo} width={120} alt="logo" />
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 relative py-6 border border-black">
                <div className="w-full sm:w-[80%] absolute right-0 px-4 sm:px-0">
                    {/* Add Blog */}
                    <Link
                        href="/admin/addBlog"
                        className="flex items-center gap-3 border border-black font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:bg-gray-200"
                    >
                        <Image
                            src={assets.add_icon}
                            alt="add"
                            width={28}
                            className="block"
                        />
                        <p className="hidden sm:inline-block">Add blogs</p>
                    </Link>

                    {/* Blog List */}
                    <Link
                        href="/admin/blogList"
                        className="mt-5 flex items-center gap-3 border border-black font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:bg-gray-200"
                    >
                        <Image
                            src={assets.blog_icon}
                            alt="blog"
                            width={28}
                            className="block"
                        />
                        <p className="hidden sm:inline-block">Blog lists</p>
                    </Link>

                    {/* Subscriptions */}
                    <Link
                        href="/admin/subscriptions"
                        className="mt-5 flex items-center gap-3 border border-black font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:bg-gray-200"
                    >
                        <Image
                            src={assets.email_icon}
                            alt="subscriptions"
                            width={28}
                            className="block"
                        />
                        <p className="hidden sm:inline-block">Subscriptions</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
