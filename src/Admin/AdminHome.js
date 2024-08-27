import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PrintForm from '../components/ApplyOnline/Printform';

const AdminHome = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Applications</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-md shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">FormId</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">IOE Symbol No.</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">IOE Rank</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">Name</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">Gender</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">DOB</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">Interested Programs</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">View Detail</th>
              <th className="px-2 py-2 text-left text-xs font-xl text-gray-900 uppercase tracking-wider">Confirmation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="border px-2 py-2 text-sm text-black">1</td>
              <td className="border px-2 py-2 text-sm text-black">1111</td>
              <td className="border px-2 py-2 text-sm text-black">1231</td>
              <td className="border px-2 py-2 text-sm text-black">Ram Bahadur</td>
              <td className="border px-2 py-2 text-sm text-black">M</td>
              <td className="border px-2 py-2 text-sm text-black">2001/10/10</td>
              <td className="border px-2 py-2 text-sm text-black">B.E Computer</td>
              <td className="border px-2 py-2 text-sm text-black">
                <Link to='/printForm' className="text-blue-600 hover:text-blue-800">View Detail</Link>
              </td>
              <td className="border px-2 py-2 text-sm">
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Accept</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Decline</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
