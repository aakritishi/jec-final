import React from "react";
import { Link } from 'react-router-dom';
import computer from '../images/computer.jpg';
import civil from '../images/civil.jpg';
import electronics from '../images/electronics.jpg';



export default function Course() {
  return (
    <div className="container mx-auto my-12">
       <div>
    <div className="container">
        <div className="row">
          <div className="col-md-6 col-2xl-12 col-sm-12 flex text-center md:h-[300px] h-[90px] align-items-center justify-content-center">
            <h1
              className="text-[45px] mb-[7px] "
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Courses Offered
            </h1>
          </div>

          <div className="col-md-6 col-2xl-12 col-sm-12 d-flex flex-column  h-[300px] align-items-start justify-content-center">
            <p
              className="text-[18px] mt-[120px]"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
             Explore University's 10+ courses across various specialisations that provoke intellectual and intuitive learning among students.
            </p>
            <Link to=''>
           
            <button
              style={{ fontFamily: "'Merriweather', serif" }}
              className=" border-solid border-2 border-black text-center flex justify-content-center align-items-center p-[15px] my-4 px-4 rounded-[10px] text-[17px] "
            >
             EXPLORE COURCES
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
}
