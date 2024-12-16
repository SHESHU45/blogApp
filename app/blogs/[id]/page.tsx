"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter

// Define BlogData interface
interface BlogData {
  title: string;
  authorImg: string;
  author: string;
  image: string;
  description: string;
}

export default function Page() {
  const [data, setData] = useState<BlogData | null>(null);

  // Access the dynamic `id` from the params
  const { id: blogId } = useParams(); // useParams retrieves the dynamic route param

  const fetchBlogData = useCallback(async () => {
    if (blogId) {
      try {
        const response = await axios.get("/api/blog", {
          params: { id: blogId },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  return data ? (
    <>
      <div
        className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28"
        suppressHydrationWarning
      >
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get started <Image src={assets.arrow} alt="" />
          </button>
        </div>
        <div className="text-center my-12 sm:my-24">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.authorImg}
            width={60}
            height={60}
            alt=""
          />
          <p className="mt-2 text-base sm:text-lg pb-2 max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white w-full rounded-lg"
          src={data.image}
          width={800}
          height={480}
          alt=""
        />
        <div
          className="blog-content mt-6 text-base sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <div className="my-12 sm:my-24">
          <p className="text-black font-semibold my-4 text-center">
            Share this article on social media
          </p>
          <div className="flex justify-center gap-4">
            <Image
              src={assets.facebook_icon}
              width={40}
              height={40}
              alt="Facebook"
            />
            <Image
              src={assets.twitter_icon}
              width={40}
              height={40}
              alt="Twitter"
            />
            <Image
              src={assets.googleplus_icon}
              width={40}
              height={40}
              alt="Google Plus"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}
