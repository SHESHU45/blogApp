'use client';

import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Blog {
  _id: string;
  title: string;
  author: string;
  authorImg: string;
  date: string;
}

const Page: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error('Failed to fetch blogs.');
    }
  };

  const deleteBlog = async (mongoId: string) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: {
          id: mongoId,
        },
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete the blog.');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 px-4 py-6 sm:px-8 sm:py-12 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Blogs</h1>
      <div className="relative h-[70vh] overflow-x-auto overflow-y-scroll border border-gray-300 rounded-lg bg-white shadow-md">
        <table className="w-full text-sm text-gray-500">
          <thead className="sticky top-0 bg-gray-100 text-xs text-gray-700 uppercase border-b border-gray-200">
            <tr>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((item) => (
                <BlogTableItem
                  key={item._id}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No blogs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
