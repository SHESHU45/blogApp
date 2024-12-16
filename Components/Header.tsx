"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  // Form submission handler
  const onSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post("/api/email", formData);

      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <header className="py-5 px-5 md:px-12 lg:px-28">
      {/* Header Navigation */}
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:bg-gray-200">
          Get started
          <Image src={assets.arrow} alt="Arrow" width={12} height={12} />
        </button>
      </div>

      {/* Header Conten t */}
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <div className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          <p>
            This is made for the people who love to read blogs. We provide the
            best blogs on the internet.
          </p>
          <p>
            <b>
              This is made by Sheshu to prove himself as a full stack developer.
            </b>
          </p>
        </div>

        {/* Subscription Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between items-center max-w-[500px] mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000] scale-75 sm:scale-100"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 pl-4 py-2 outline-none text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 bg-gray-50 hover:bg-gray-600 hover:text-white active:bg-gray-700"
          >
            Subscribe
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
