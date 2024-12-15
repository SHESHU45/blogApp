import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BlogItemProps {
    title: string;
    description: string;
    category: string;
    image: string;
    id: string | number;
}

const BlogItem: React.FC<BlogItemProps> = ({ title, description, category, image, id }) => {
    return (
        <div className="max-w-[95%] sm:max-w-[330px] md:max-w-[300px] bg-white border border-black transition-all hover:shadow-[-5px_5px_0px_#000000] mx-auto sm:mx-0">
            {/* Blog Image */}
            <Link href={`/blogs/${id}`}>
                <Image
                    src={image}
                    alt={`${title} image`}
                    width={400}
                    height={400}
                    className="border-b border-black object-cover w-full h-[200px] sm:h-[250px]"
                />
            </Link>

            {/* Category Tag */}
            <p className="ml-4 mt-4 px-2 py-1 inline-block bg-black text-white text-xs sm:text-sm rounded">
                {category}
            </p>

            {/* Content */}
            <div className="p-4 sm:p-5">
                <h5 className="mb-2 text-base sm:text-lg font-medium tracking-tight text-gray-900">
                    {title}
                </h5>
                <p
                    className="mb-3 text-xs sm:text-sm tracking-tight text-gray-700"
                    dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
                ></p>

                {/* Read More Link */}
                <Link
                    href={`/blogs/${id}`}
                    className="inline-flex items-center text-sm sm:text-base font-semibold text-gray-800 hover:text-black"
                >
                    Read more
                    <Image
                        src={assets.arrow}
                        className="ml-2"
                        alt="arrow icon"
                        width={12}
                        height={12}
                    />
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;
