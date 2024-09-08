import React from 'react';
import { Link } from 'react-router-dom';
import news from '../images/news.jfif';

export default function News() {
  return (
    <>
      <div className='sm:mx-[20px] md:mx-[120px]'>
        <div className='mt-5' style={{ fontFamily: "'Merriweather', serif", color: '#003366' }}>
          <div>
            <h1 className='text-[40px] text-red-600 transition-all duration-500 hover:text-red-800'>
              News & Updates
            </h1>
          </div>
        </div>

        <div className='container-fluid mt-[70px]'>
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <p className='text-lg text-justify' style={{ fontFamily: "'Merriweather', serif" }}>
                Welcome to the JEC News & Updates page, your go-to source for the latest happenings and important announcements.
                Stay tuned for updates on upcoming events, recent achievements, and important changes within our community. We’re excited to share news that highlights our progress and celebrates our collective efforts.
              </p>
            </div>

            <div className='col-sm-12 col-md-6 flex items-end justify-end'>
              <img src={news} className='h-[200px] rounded-[10px] shadow-lg transition-transform duration-500 transform hover:scale-105' alt="Learn More" />
            </div>
          </div>
        </div>
        <div className='container mt-16'>
          <div className='row'>
            {Array(8).fill().map((_, index) => (
              <div className='col-12 col-md-6 col-lg-4 mb-[30px]' key={index}>
                <div className="card mx-auto max-w-sm rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  <img src="https://via.placeholder.com/150" className="card-img-top rounded-t-lg transition-transform duration-500 transform hover:scale-110" style={{ height: "200px", objectFit: "cover" }} alt="Computer Engineering" />
                  <div className="card-body p-4">
                    <h5 className="card-title text-xl font-bold text-blue-900 transition-all duration-300 hover:text-blue-700">
                      NEWS TITLE
                    </h5>
                    <p className="text-sm text-gray-600">DATE:</p>
                    <h1 className="text-sm font-normal">BY: NAME</h1>
                    <Link to=''>
                      <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-lg">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
