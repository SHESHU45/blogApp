import React from 'react';

interface SubsTableItemProps {
    email: string | null;
    mongoId: string;
    deleteEmail: (id: string) => void;
    date: string;
}

const SubsTableItem: React.FC<SubsTableItemProps> = ({ email, mongoId, deleteEmail, date }) => {
    const emailDate = new Date(date);

    return (
        <tr className="bg-white border-b text-left text-sm sm:text-base">
            {/* Email Column */}
            <th
                scope="row"
                className="px-4 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap"
            >
                {email ? email : 'No Email'}
            </th>

            {/* Date Column - Hidden on Small Screens */}
            <td className="px-4 py-2 hidden sm:table-cell sm:px-6 sm:py-4">
                {emailDate.toDateString()}
            </td>

            {/* Delete Icon */}
            <td
                className="px-4 py-2 sm:px-6 sm:py-4 cursor-pointer text-red-600 hover:text-red-800"
                onClick={() => deleteEmail(mongoId)}
            >
                &times;
            </td>
        </tr>
    );
};

export default SubsTableItem;
