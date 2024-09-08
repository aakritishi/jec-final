import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import logo from '../images/jec-logo.png';
import FooterTop from './FooterTop';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <FooterTop />
      <div className='bg-blue-800 pb-6 pt-4 relative overflow-hidden' style={{ fontFamily: "'Merriweather', serif" }}>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 opacity-50'></div>
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#000,transparent_10px,transparent_20px,transparent_30px,#000_30px),linear-gradient(90deg,#000,transparent_10px,transparent_20px,transparent_30px,#000_30px)] opacity-20'></div>
        <div className='container text-white py-6 relative' style={{ fontFamily: "'Merriweather', serif" }}>
          <div className='flex flex-wrap -mx-4'>
            <div className='w-full md:w-1/4 px-4 mb-6'>
              <div className='flex justify-center items-center mb-4'>
                <img className="rounded-2xl w-[250px]" src={logo} alt="logo" />
              </div>
              <div className='flex gap-4 justify-center mb-4'>
                <a href='#' aria-label='Facebook' className='text-white hover:text-red-600 transition-colors'>
                  <FontAwesomeIcon icon={faFacebook} size='2x' />
                </a>
                <a href='#' aria-label='Instagram' className='text-white hover:text-red-600 transition-colors'>
                  <FontAwesomeIcon icon={faInstagram} size='2x' />
                </a>
                <a href='#' aria-label='Twitter' className='text-white hover:text-red-600 transition-colors'>
                  <FontAwesomeIcon icon={faTwitter} size='2x' />
                </a>
                <a href='#' aria-label='LinkedIn' className='text-white hover:text-red-600 transition-colors'>
                  <FontAwesomeIcon icon={faLinkedin} size='2x' />
                </a>
              </div>
            </div>

            <div className='w-full md:w-1/4 px-4 mb-6'>
              <h1 className='text-2xl font-bold mb-4'>Useful Links</h1>
              <div className='flex flex-col gap-3'>
                <Link to='/' className='hover:text-red-600 transition-colors'>Home</Link>
                <Link to='/onlineApply' className='hover:text-red-600 transition-colors'>Admission</Link>
                <Link to='/admission' className='hover:text-red-600 transition-colors'>Requirements</Link>
                <Link to='/contact-us' className='hover:text-red-600 transition-colors'>Contact Us</Link>
                <Link to='/privacypolicy' className='hover:text-red-600 transition-colors'>Privacy Policy</Link>
              </div>
            </div>

            <div className='w-full md:w-1/4 px-4 mb-6'>
              <h1 className='text-2xl font-bold mb-4'>Our University</h1>
              <div className='flex flex-col gap-3'>
                <Link to='/about/introduction' className='hover:text-red-600 transition-colors'>About Us</Link>
                <Link to='/facilities' className='hover:text-red-600 transition-colors'>Facilities</Link>
                <Link to='/academics' className='hover:text-red-600 transition-colors'>Academics</Link>
                <Link to='/news' className='hover:text-red-600 transition-colors'>News</Link>
              </div>
            </div>

            <div className='w-full md:w-1/4 px-4 mb-6'>
              <h1 className='text-2xl font-bold mb-4'>Contact Details</h1>
              <div className='flex flex-col gap-3'>
                <p>Kupondole, Lalitpur, Nepal</p>
                <p>Phone: 01-5555555</p>
                <p>Email: info@jec.edu.np</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
