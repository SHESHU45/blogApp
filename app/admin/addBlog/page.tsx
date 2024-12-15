'use client';

import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

interface BlogData {
  title: string;
  description: string;
  category: string;
  author: string;
  authorImg: string;
}

const Page: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<BlogData>({
    title: "",
    description: "",
    category: "Startup",
    author: "GirlFriend",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "GirlFriend",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 sm:p-12"
      >
        <p className="text-lg font-semibold text-gray-700">Upload Thumbnail</p>
        <label htmlFor="image" className="block mt-4">
          <Image
            className="mx-auto cursor-pointer"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="thumbnail"
          />
        </label>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0] || null)}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-lg font-semibold text-gray-700 mt-6">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-lg font-semibold text-gray-700 mt-6">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="Write content here"
          rows={6}
          required
        />
        <p className="text-lg font-semibold text-gray-700 mt-6">Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Page;
