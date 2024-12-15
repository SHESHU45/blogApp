'use client';

import SubsTableItem from '@/Components/AdminComponents/SubsTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Subscription {
  _id: string;
  email: string;
  date: string;
}

const Page: React.FC = () => {
  const [emails, setEmails] = useState<Subscription[]>([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch (error) {
      toast.error('Failed to fetch emails.');
    }
  };

  const deleteEmail = async (mongoId: string) => {
    try {
      const response = await axios.delete('/api/email', {
        params: {
          id: mongoId,
        },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails();
      } else {
        toast.error('Error deleting email.');
      }
    } catch (error) {
      toast.error('Failed to delete the email.');
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 px-4 py-6 sm:px-8 sm:py-12 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Subscriptions</h1>
      <div className="relative h-[70vh] max-w-[600px] overflow-x-auto overflow-y-scroll border border-gray-300 rounded-lg bg-white shadow-md">
        <table className="w-full text-sm text-gray-500">
          <thead className="sticky top-0 bg-gray-100 text-xs text-gray-700 uppercase border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.length > 0 ? (
              emails.map((item) => (
                <SubsTableItem
                  key={item._id}
                  mongoId={item._id}
                  deleteEmail={deleteEmail}
                  email={item.email}
                  date={item.date}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No subscriptions available.
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
