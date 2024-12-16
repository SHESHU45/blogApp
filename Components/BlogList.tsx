'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';

interface Blog {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

const BlogList: React.FC = () => {
  const [menu, setMenu] = useState<string>('All');
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetch blogs from the backend
  const fetchBlogs = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {/* Category Menu */}
      <div className="flex justify-center gap-4 sm:gap-6 my-6 sm:my-10 flex-wrap">
        {['All', 'Technology', 'Startup', 'Lifestyle'].map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`py-1 px-4 rounded-sm transition-all ${
              menu === category
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 px-4 sm:px-8 xl:mx-24">
        {blogs
          .filter((item) => (menu === 'All' ? true : item.category === menu))
          .map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
