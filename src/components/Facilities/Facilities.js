import React from 'react';
import facilities from '../images/facilities.jpg';
import { Link } from 'react-router-dom';
import wifi from '../images/wifi.png';
import library from '../images/libary.png';
import hostel from '../images/hostel.jpg';
import food from '../images/hfood.png';
import counselling from '../images/counselling.jpg';
import staff from '../images/staff.png';
import sport from '../images/sport.png';
import internship from '../images/intenship.png';
import bus from '../images/bus.jpg';

export default function Facilities() {
  const facilitiesData = [
    {
      id: 1,
      img: wifi,
      title: 'WiFi',
      description: 'Janakpur Engineering College (JEC) provides comprehensive Wi-Fi facilities designed to support its...',
    },
    {
      id: 2,
      img: library,
      title: 'Library',
      description: 'The library at Janakpur Engineering College (JEC) serves as a vital resource center for students and...',
    },
    {
      id: 3,
      img: hostel,
      title: 'Hostel',
      description: 'The hostel facilities at Janakpur Engineering College (JEC) are designed to provide a comfortable and supportive living...',
    },
    {
      id: 4,
      img: food,
      title: 'Hygienic Food',
      description: 'Janakpur Engineering College (JEC) prioritizes the health and well-being of its students by providing hygienic and...',
    },
    {
      id: 5,
      img: counselling,
      title: 'Counselling Section',
      description: 'Janakpur Engineering College (JEC) offers a dedicated counseling section to support...',
    },
    {
      id: 6,
      img: staff,
      title: 'Qualified Staff',
      description: 'Janakpur Engineering College (JEC) is committed to providing quality education with a focus on employing well-qualified...',
    },
    {
      id: 7,
      img: sport,
      title: 'Sport Ground',
      description: 'Janakpur Engineering College (JEC) boasts a well-maintained sports ground, offering students ample...',
    },
    {
      id: 8,
      img: internship,
      title: 'Internship and Placement',
      description: 'Janakpur Engineering College (JEC) provides robust internship and placement opportunities...',
    },
    {
      id: 9,
      img: bus,
      title: 'Transportation',
      description: 'JEC offers convenient transportation services for students and staff, ensuring easy and safe travel...',
    },
  ];

  return (
    <>
      <div className='sm:mx-[20px] md:mx-[120px]'>
        <div>
          <h1 className='text-[38px] my-5 text-red-500 sm:text-center md:text-start' style={{ fontFamily: "'Merriweather', serif" }}>
            Know the facilities<br /> provided by JEC.
          </h1>
        </div>

        <div className='container-fluid'>
          <div className="row">
            <div className="col-md-6">
              <p className='font-[12px]'>
                Janakpur Engineering College (JEC) offers excellent facilities for an optimal learning environment. The college has a comprehensive library, modern laboratories, and advanced classrooms with projectors and smart boards. A fully equipped computer center provides high-speed internet and the latest software. Additionally, comfortable and secure hostel accommodations ensure a conducive living environment for students.
              </p>
            </div>
            <div className="col-md-6 flex items-center justify-end">
              <img src={facilities} alt="JEC Facilities" className='w-[300px] shadow-lg hover:shadow-xl transition-shadow duration-300' />
            </div>
          </div>
        </div>

        <div>
          <h1 className='text-[45px] my-5 text-red-500' style={{ fontFamily: "'Merriweather', serif" }}>Facilities</h1>
        </div>

        <div className='container-fluid py-7'>
          <div className='row'>
            {facilitiesData.map((facility) => (
              <div key={facility.id} className='col-12 col-md-6 col-lg-4 mb-4'>
                <div className="card mx-auto shadow-md hover:shadow-xl transition-shadow duration-300" style={{ width: "100%" }}>
                  <div className='flex items-center justify-center my-3'>
                    <img src={facility.img} className="card-img-top h-[150px] w-[150px] object-cover transition-transform duration-300 hover:scale-105" alt={facility.title} />
                  </div>
                  <div className="card-body flex flex-col items-center justify-center">
                    <h5 className="card-title text-[24px] text-center text-blue-500" style={{ fontFamily: "'Merriweather', serif" }}>{facility.title}</h5>
                    <p className="text-center">{facility.description}</p>
                    <Link to='/learnMore'>
                      <button style={{ fontFamily: "'Merriweather', serif" }} className="mt-[20px] bg-blue-500 text-white py-[12px] px-[30px] rounded-[10px] text-[14px] hover:bg-red-500 hover:text-white transition duration-300">
                        Learn More
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
