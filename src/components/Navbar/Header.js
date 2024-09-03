import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../media/images/jec-logo.png';
import ProfileIcon from '../webpage/forms/ProfileIcon';
import axios from 'axios';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Toggle the mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Toggle the dropdown menu
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Check login status and admin status
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await axios.get('https://192.168.1.135:8000/api/accounts/user/', {
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });

                    // Log the entire response for debugging
                    console.log('API Response:', response.data);

                    // Adjust the access based on the actual response structure
                    const userData = response.data; // Adjust this based on actual structure

                    // Check if userData has is_staff property
                    if (userData && userData.is_staff !== undefined) {
                        setIsAdmin(userData.is_staff);
                    } else {
                        console.error('is_staff not found in response');
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error.response ? error.response.data : error.message);
                }
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <div className='z-50 w-full bg-blue-900' style={{ fontFamily: "'Merriweather', serif" }}>
            <div className='lg:w-[95%] w-full flex justify-between items-center mx-auto p-2'>
                <div>
                    <Link to="/"><img src={logo} className='h-20' alt="Logo" /></Link>
                </div>
                <div className='md:hidden' onClick={toggleMenu} aria-label="Toggle menu">
                    {menuOpen ? (
                        <FaTimes className="text-white text-3xl transition-transform duration-300 hover:text-gray-300" />
                    ) : (
                        <FaBars className="text-white text-3xl transition-transform duration-300 hover:text-gray-300" />
                    )}
                </div>
                <div className='hidden md:flex items-center w-full md:w-auto gap-5'>
                    <ul className='flex flex-col md:flex-row gap-5 p-2'>
                        <li className="relative group">
                            <button className="text-xl text-white hover:text-gray-300 transition duration-700 border-none">
                                About Us
                            </button>
                            <ul className="absolute left-0 hidden mt-0 w-60 bg-white text-black rounded-lg shadow-lg z-20 border-t-4 border-blue-500 group-hover:block">
                                <li><Link to="/about/introduction" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800 rounded-t-lg">Introduction</Link></li>
                                <li><Link to="/about/courses-offered" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800">Courses Offered</Link></li>
                                <li><Link to="/about/jec-advisory-board" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800 rounded-b-lg">JEC Advisory Board</Link></li>
                                <li><Link to="/teachers" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800 rounded-b-lg">JEC Teachers</Link></li>
                            </ul>
                        </li>
                        <li><Link to='/admission' className="text-xl text-white hover:text-gray-300 transition duration-300">Admission</Link></li>
                        <li><Link to='/facilities' className="text-xl text-white hover:text-gray-300 transition duration-300">Facilities</Link></li>
                        <li><Link to='/news' className="text-xl text-white hover:text-gray-300 transition duration-300">News & Updates</Link></li>
                        <li><Link to='/contact-us' className="text-xl text-white hover:text-gray-300 transition duration-300">Contact</Link></li>
                        {isAdmin && <li><Link to="/admin/adminhome" className='text-xl text-white hover:text-gray-300 transition duration-300'>Admin</Link></li>}
                    </ul>
                    <ProfileIcon />
                </div>
            </div>

            <div className={`fixed top-0 right-0 h-full bg-blue-900 z-50 transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 md:hidden`}>
                <div className="flex justify-end p-4">
                    <FaTimes 
                        className="text-white text-3xl cursor-pointer hover:text-gray-300" 
                        onClick={toggleMenu} 
                        aria-label="Close menu" 
                    />
                </div>
                <ul className='flex flex-col gap-5 p-3 mt-10'>
                    <li>
                        <div className='mb-4'>
                            <ProfileIcon />
                        </div>
                        <button 
                            onClick={toggleDropdown} 
                            className="text-xl text-white hover:text-gray-300 transition duration-300 border-none"
                        >
                            About Us
                        </button>
                        {isDropdownOpen && (
                            <ul className="mt-2 bg-white text-black rounded-lg shadow-lg z-20">
                                <li><Link to="/about/introduction" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800 rounded-t-lg">Introduction</Link></li>
                                <li><Link to="/about/courses-offered" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800">Courses Offered</Link></li>
                                <li><Link to="/about/jec-advisory-board" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800 rounded-b-lg">JEC Advisory Board</Link></li>
                                <li><Link to="/teachers" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800 text-lg rounded-b-lg">JEC Teachers</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to='/admission' className="text-xl text-white hover:text-gray-300 transition duration-300">Admission</Link></li>
                    <li><Link to='/news' className="text-xl text-white hover:text-gray-300 transition duration-300">News & Updates</Link></li>
                    <li><Link to='/contact-us' className="text-xl text-white hover:text-gray-300 transition duration-300">Contact</Link></li>
                    {isAdmin && <li><Link to="/admin/adminhome" className='text-xl text-white hover:text-gray-300 transition duration-300'>Admin</Link></li>}
                </ul>
            </div>
        </div>
    );
};
