import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

interface BlogTableItemProps {
  authorImg?: string;
  title?: string;
  author?: string;
  date: string | number | Date;
  deleteBlog: (mongoId: string) => void;
  mongoId: string;
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  // Ensure date is converted to a Date object
  const BlogDate = new Date(date);

  return (
    <>
      {/* For larger screens - table row */}
      <tr className="bg-white border-b hidden sm:table-row">
        <th
          scope="row"
          className="flex items-center gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <Image
            width={40}
            height={40}
            src={authorImg || assets.profile_icon}
            alt="author"
            className="rounded-full"
          />
          <p>{author || 'No author'}</p>
        </th>
        <td className="px-6 py-4">{title || 'No title'}</td>
        <td className="px-6 py-4">{BlogDate.toDateString()}</td>
        <td
          onClick={() => deleteBlog(mongoId)}
          className="px-6 py-4 cursor-pointer text-red-600 hover:text-red-800"
        >
          x
        </td>
      </tr>

      {/* For small screens - card view */}
      <div className="sm:hidden bg-white shadow-md rounded-md p-4 mb-3">
        <div className="flex items-center gap-3 mb-2">
          <Image
            width={40}
            height={40}
            src={authorImg || assets.profile_icon}
            alt="author"
            className="rounded-full"
          />
          <p className="font-medium text-gray-900">{author || 'No author'}</p>
        </div>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Title:</span> {title || 'No title'}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Date:</span> {BlogDate.toDateString()}
        </p>
        <button
          onClick={() => deleteBlog(mongoId)}
          className="text-red-600 hover:text-red-800 mt-2"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default BlogTableItem;
