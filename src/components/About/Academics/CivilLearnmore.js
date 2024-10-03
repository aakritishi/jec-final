import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed
import people from '../../images/people.png';
import clock from '../../images/clock.png';
import report from '../../images/report.png';

export default function CivilLearnMore() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [availableSeats, setAvailableSeats] = useState(0);
  const [courseIntroduction, setCourseIntroduction] = useState('');
  const [courseBenefits, setCourseBenefits] = useState([]);
  
  const [newBenefit, setNewBenefit] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("authToken");
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchCourseData = async () => {
      try {
        const response = await axios.get('http://192.168.1.136:8000/api/courses/',{
          headers: {
            
            Authorization: `Token ${token}`,
          },
        });
        const data = response.data;
        setCourseName(data.courseName);
        setCourseDescription(data.courseDescription);
        setAvailableSeats(data.availableSeats);
        setCourseIntroduction(data.courseIntroduction);
        setCourseBenefits(data.courseBenefits || []); // Ensure courseBenefits is always an array
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    
    fetchCourseData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      courseName,
      courseDescription,
      availableSeats,
      courseIntroduction,
      courseBenefits,
    };

    try {
      const token = localStorage.getItem("authToken");
      await axios.post('http://192.168.1.136:8000/api/courses/',{
        headers: {
          Authorization: `Token ${token}`,
     
         } 
        },
        
        updatedData);
      alert('Course details updated successfully!');
    } catch (error) {
      console.error("Error updating course data:", error);
    }
  };

  const handleBenefitSubmit = () => {
    if (editIndex !== null) {
      const updatedBenefits = courseBenefits.map((benefit, index) =>
        index === editIndex ? newBenefit : benefit
      );
      setCourseBenefits(updatedBenefits);
      setEditIndex(null);
    } else {
      if (newBenefit) {
        setCourseBenefits((prevBenefits) => [...prevBenefits, newBenefit]);
      }
    }
    setNewBenefit('');
  };

  const deleteBenefit = (index) => {
    setCourseBenefits(courseBenefits.filter((_, i) => i !== index));
  };

  const editBenefit = (index) => {
    setNewBenefit(courseBenefits[index]);
    setEditIndex(index);
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {/* Course Information Display */}
      <div className='flex items-center justify-center mt-5 text-center'>
        <div>
          <button onClick={toggleEditing} className="px-4 py-2 text-white bg-blue-500 rounded">
            {isEditing ? 'Cancel Editing' : 'Edit component'}
          </button>
        </div>
        <div className='w-[380px] h-auto flex text-center items-center justify-center rounded'>
          <h1 className='text-[50px] font-bold text-center'>
            <span className='text-red-500'>{courseName}</span>
          </h1>
        </div>
      </div>

      <div className='ms-9 mt-9'>
        <h1 className='text-[40px] font-bold'>COURSE <span className='text-red-500'>DESCRIPTION</span></h1>
      </div>
      <div className='h-[400px] flex items-center justify-center'>
        <p>{courseDescription}</p>
      </div>

      <h1 className='text-[40px] font-bold text-center my-4'>COURSE <span className='text-red-500'>FEATURES</span></h1>

      <div className='container font-bold text-[20px]'>
        <div className='row'>
          <div className='flex flex-col items-center justify-center col-12 col-md-4 col-sm-12 col-xs-12'>
            <img className="card-img-top rounded-2xl w-[120px]" src={people} alt="people" />
            <h1 className='text-[30px] font-bold text-center'>AVAILABLE <span className='text-red-500'>SEATS</span></h1>
            <h1 className='text-[30px] mt-3'>{availableSeats}</h1>
          </div>

          <div className='flex flex-col items-center justify-center col-12 col-md-4 col-sm-12 col-xs-12'>
            <img className="card-img-top rounded-2xl w-[100px]" src={clock} alt="clock" />
            <h1 className='text-[30px] font-bold text-center mt-3 text-red-500'>DURATION</h1>
            <h1 className='text-[20px] mt-3'>4 YEAR</h1>
          </div>

          <div className='flex flex-col items-center justify-center col-12 col-md-4 col-sm-12 col-xs-12'>
            <img className="card-img-top rounded-2xl w-[100px]" src={report} alt="report" />
            <h1 className='text-[30px] font-bold text-center mt-3'>MIN <span className='text-red-500'>QUALIFICATION</span></h1>
            <h1 className='text-[20px] mt-3 text-center'>Intermediate Level/40% <br /> in IOE Entrance.</h1>
          </div>
        </div>
      </div>

      <div className='mt-20 ms-9'>
        <h1 className="text-[40px] font-bold">INTROD<span className="text-red-500">UCTION</span></h1>
      </div>
      <div className='h-[400px] flex items-center justify-center'>
        <p>{courseIntroduction}</p>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[40px] font-bold text-center mb-6'>COURSE <span className='text-red-500'>BENEFITS</span></h1>
        <ul className='text-[25px] font-bold text-green-500 ms-3'>
          {(courseBenefits || []).map((benefit, index) => (
            <li key={index} className='flex justify-between'>
              {benefit}
              {isEditing && (
                <div>
                  <button onClick={() => editBenefit(index)}>Edit</button>
                  <button onClick={() => deleteBenefit(index)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-20 mb-6 text-center ms-9'>
        <h1 className='text-[40px] font-bold'>COURSE <span className='text-red-500'>STRUCTURE</span></h1>
      </div>

      {/* Admin Panel - Conditionally rendered based on isEditing */}
      {isEditing && (
        <div className='mt-10 mb-10'>
          <h2 className='text-[30px] font-bold text-center mb-5'>Admin Panel</h2>
          <form onSubmit={handleSubmit} className='max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg'>
            <div className='mb-4'>
              <label className='block mb-1 font-bold' htmlFor="courseName">Course Name</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1 font-bold' htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Course Description"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                rows="3"
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1 font-bold' htmlFor="availableSeats">Available Seats</label>
              <input
                type="number"
                id="availableSeats"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1 font-bold' htmlFor="courseIntroduction">Course Introduction</label>
              <textarea
                id="courseIntroduction"
                value={courseIntroduction}
                onChange={(e) => setCourseIntroduction(e.target.value)}
                placeholder="Course Introduction"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                rows="3"
              />
            </div>

            <button type="submit" className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded shadow-md hover:bg-blue-700">
              Save Course Details
            </button>
          </form>
        </div>
      )}
    </>
  );
}
