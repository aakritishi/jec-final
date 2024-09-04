import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../media/images/jec-logo.png';

export const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 h-screen bg-blue-800 p-4 ${menuOpen ? 'w-64' : 'w-16'} transition-width duration-300 md:w-64`}>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl mb-8">
            <Link to='/'><img src={logo}/></Link>
          </h1>
          <div className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? (
              <FaTimes className="text-white text-3xl cursor-pointer hover:text-gray-300" />
            ) : (
              <FaBars className="text-white text-3xl cursor-pointer hover:text-gray-300" />
            )}
          </div>
        </div>
        <ul className={`mt-8 flex flex-col ${menuOpen ? 'block' : 'hidden'} md:flex md:items-start md:space-y-4`}>
          <li className="text-gray-300 hover:text-white mb-4">
            <Link to="/applicationstatus" className="flex items-center text-xl text-white hover:text-gray-300 transition duration-300">
              Application Status
            </Link>
          </li>
          <li className="text-gray-300 hover:text-white mb-4">
            <Link to="/addteam" className="flex items-center text-xl text-white hover:text-gray-300 transition duration-300">
               Add Team
            </Link>
          </li>
        </ul>
        
      </div>
    </>
  );
};
