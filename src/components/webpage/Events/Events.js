import React from 'react';
import academic from '../../images/academic.png';
import { Link } from 'react-router-dom';

export default function Events() {
  return (
    <>
      <div className='container mx-auto px-4'>
        <div className='row flex flex-col md:flex-row items-center justify-center mb-10'>
          <div className='col-md-6 flex justify-center md:h-[300px] h-[70px]'>
            <h1 className='text-[30px] sm:text-[45px] mb-[10px] sm:mb-[1px] text-center' style={{ fontFamily: "'Merriweather', serif" }}>Happening Now</h1>
          </div>
          <div className='col-md-6 flex flex-col h-[300px] justify-center'>
            <p className='text-[16px] sm:text-[18px] mb-4' style={{ fontFamily: "'Merriweather', serif" }}>
              At University’s beautiful campus, you’ll find a diverse and welcoming community that will teach you life skills along with having fun.
            </p>
            <div className='flex justify-center items-center'>
              <Link to='/exploreEvents'>
              <button style={{ fontFamily: "'Merriweather', serif" }} className='border-solid border-2 border-black text-center flex justify-center items-center p-[10px] sm:p-[15px] my-4 px-4 rounded-[10px] text-[15px] sm:text-[17px] transition duration-300 hover:bg-blue-600 hover:text-white'>
                EXPLORE EVENTS
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div className='container-fluid'>
          <div className='row flex justify-center'>
            {['01', '02', '03'].map((num, index) => (
              <div key={index} className='col-12 col-md-6 col-lg-4 flex flex-col justify-center items-center mb-10'>
                <div className='card custom-card pb-4' style={{ width: '23rem', fontFamily: "'Playfair Display', serif" }}>
                  <h5 className='card-title text-[20px] mt-3'>{num}</h5>
                  <h5 className='card-title my-2 text-[30px] sm:text-[40px]'>Academics</h5>
                  <div className='card-img-container flex items-center justify-center'>
                    <img src={academic} className='card-img-top' alt='...' />
                  </div>
                  <div className='card-body'>
                    <p className='card-text'>
                      Students of University take part in scholarship exams organized by the local community.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-card {
          border: 2px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .custom-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .card-img-container {
          overflow: hidden;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .card-img-top {
          width: 90%;
          height: auto;
          transition: transform 0.3s ease;
        }
        .card-img-top:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
