import React from 'react';

const ApplicationStatus = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Applications</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-md shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 sm:px-4 py-2">FormId</th>
              <th className="px-2 sm:px-4 py-2">IOE Symbol No.</th>
              <th className="px-2 sm:px-4 py-2">IOE Rank</th>
              <th className="px-2 sm:px-4 py-2">Name</th>
              <th className="px-2 sm:px-4 py-2">Gender</th>
              <th className="px-2 sm:px-4 py-2">DOB</th>
              <th className="px-2 sm:px-4 py-2">Intrested Programs</th>
              <th className="px-2 sm:px-4 py-2">View Detail</th>
              <th className="px-2 sm:px-4 py-2">Confirmation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 sm:px-4 py-2">1</td>
              <td className="border px-2 sm:px-4 py-2">B.E Computer</td>
              <td className="border px-2 sm:px-4 py-2">
                <a href="#" className="text-blue-500">View Detail</a>
              </td>
              <td className="border px-2 sm:px-4 py-2">
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

export default ApplicationStatus;
