import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <div className="bg-blue-800 h-screen w-[18%] p-4">
        {/* <h1 className="text-white text-xl mb-8">JEC</h1> */}
        <ul>
          <li className="text-gray-300 hover:text-white mb-4">
            <Link
              to="/applicationstatus"
              className="text-xl text-white hover:text-gray-300 transition duration-300"
            >
              Application Status
            </Link>
          </li>
          <li className="text-gray-300 hover:text-white mb-4">
            <Link
              to="/update"
              className="text-xl text-white hover:text-gray-300 transition duration-300"
            >
              Update
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
