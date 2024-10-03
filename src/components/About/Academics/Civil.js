import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Header } from '../../Navbar/Header';

export default function Civil() {
  const [data, setData] = useState({
    firstYear: { semester1: { title: 'Semester I', creditHours: 18, courses: [] }, semester2: { title: 'Semester II', creditHours: 18, courses: [] }},
    secondYear: { semester1: { title: 'Semester I', creditHours: 18, courses: [] }, semester2: { title: 'Semester II', creditHours: 18, courses: [] }},
    thirdYear: { semester1: { title: 'Semester I', creditHours: 18, courses: [] }, semester2: { title: 'Semester II', creditHours: 18, courses: [] }},
    fourthYear: { semester1: { title: 'Semester I', creditHours: 18, courses: [] }, semester2: { title: 'Semester II', creditHours: 18, courses: [] }},
  });

  const [formData, setFormData] = useState({
    newCourse: '',
    editCourseIndex: null,
    editCourseName: '',
    currentYear: 'firstYear',
    currentSemester: 'semester1'
  });

  const [editing, setEditing] = useState(false);
  const [isManagingCourses, setIsManagingCourses] = useState(false); // New state for toggling management view

  // Fetch course data from the server
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('http://192.168.1.136:8000/api/course-structure');  // Replace with your actual API endpoint
        setData(response.data);  // Assuming the data structure matches the state
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  // Add a new course
  const handleAddCourse = async () => {
    if (formData.newCourse) {
      const updatedCourses = [...data[formData.currentYear][formData.currentSemester].courses, formData.newCourse];

      // Update state
      const newData = {
        ...data,
        [formData.currentYear]: {
          ...data[formData.currentYear],
          [formData.currentSemester]: {
            ...data[formData.currentYear][formData.currentSemester],
            courses: updatedCourses
          }
        }
      };
      setData(newData);

      // Send the new course data to the server
      try {
        await axios.post('http://192.168.1.136:8000/api/course-structure/', {
          year: formData.currentYear,
          semester: formData.currentSemester,
          newCourse: formData.newCourse
        });
      } catch (error) {
        console.error("Error adding course:", error);
      }

      setFormData({ ...formData, newCourse: '' });
    }
  };

  // Edit a course
  const handleEditCourse = (index, year, semester) => {
    const courseName = data[year][semester].courses[index];
    setFormData({ ...formData, editCourseIndex: index, editCourseName: courseName, currentYear: year, currentSemester: semester });
    setEditing(true);
  };

  // Update course on the server
  const handleUpdateCourse = async () => {
    if (formData.editCourseName) {
      const updatedCourses = [...data[formData.currentYear][formData.currentSemester].courses];
      updatedCourses[formData.editCourseIndex] = formData.editCourseName;

      // Update state
      const newData = {
        ...data,
        [formData.currentYear]: {
          ...data[formData.currentYear],
          [formData.currentSemester]: {
            ...data[formData.currentYear][formData.currentSemester],
            courses: updatedCourses
          }
        }
      };
      setData(newData);

      // Send the updated course data to the server
      try {
        const token = localStorage.getItem("authToken");
        await axios.put('http://192.168.1.136:8000/api/course-structure/1/', {
          header: {  Authorization: `Token ${token}`,},
          year: formData.currentYear,
          semester: formData.currentSemester,
          index: formData.editCourseIndex,
          newCourseName: formData.editCourseName
        });
      } catch (error) {
        console.error("Error updating course:", error);
      }

      // Reset the form and stop editing
      setFormData({ ...formData, editCourseName: '', editCourseIndex: null });
      setEditing(false);
    }
  };

  // Delete a course
  const handleDeleteCourse = async (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      const updatedCourses = data[formData.currentYear][formData.currentSemester].courses.filter((_, i) => i !== index);

      // Update state
      const newData = {
        ...data,
        [formData.currentYear]: {
          ...data[formData.currentYear],
          [formData.currentSemester]: {
            ...data[formData.currentYear][formData.currentSemester],
            courses: updatedCourses
          }
        }
      };
      setData(newData);

      // Send the delete request to the server
      try {
        await axios.delete('http://192.168.1.136:8000/api/course-structure', {
          data: {
            year: formData.currentYear,
            semester: formData.currentSemester,
            index
          }
        });
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className='container p-6 mx-auto'>
      <button 
        onClick={() => setIsManagingCourses(prev => !prev)} 
        className='px-10 py-2 mb-5 font-semibold text-white bg-red-500 rounded-3'
      >
        {isManagingCourses ? 'Hide Manage Course' : 'Manage Course'}
      </button>

      {isManagingCourses && ( // Conditionally render the management section
        <form onSubmit={(e) => e.preventDefault()} className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-center">Manage Courses</h1>

          {/* Dropdown to select year and semester */}
          <div className="mb-4">
            <p className='font-bold text-red-500'>Select the year and semester you want to edit</p>
            <label htmlFor="currentYear" className="block mb-2 font-semibold">Select Year</label>
            <select 
              name="currentYear" 
              value={formData.currentYear} 
              onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
              className="w-full p-2 transition duration-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(data).map(year => (
                <option key={year} value={year}>
                  {year.charAt(0).toUpperCase() + year.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="currentSemester" className="block mb-2 font-semibold">Select Semester</label>
            <select 
              name="currentSemester" 
              value={formData.currentSemester} 
              onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
              className="w-full p-2 transition duration-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(data[formData.currentYear]).map(semester => (
                <option key={semester} value={semester}>
                  {data[formData.currentYear][semester].title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="newCourse" className="block mb-2 font-semibold">New Course</label>
            <input 
              type="text" 
              id="newCourse" 
              name="newCourse" 
              value={formData.newCourse} 
              onChange={(e) => setFormData({ ...formData, newCourse: e.target.value })} 
              className="w-full p-2 transition duration-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new course name"
            />
            <button 
              type="button" 
              onClick={handleAddCourse} 
              className="w-full p-2 mt-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Course
            </button>
          </div>

          {/* Display courses for all years */}
        
        </form>
      )}
        <div className="flex flex-wrap">
            {['firstYear', 'secondYear', 'thirdYear', 'fourthYear'].map(year => (
              <div key={year} className="w-full p-6 mb-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  {year.charAt(0).toUpperCase() + year.slice(1)}
                </h2>
                {Object.keys(data[year]).map(semester => (
                  <div key={semester} className="mb-4">
                    <h3 className="mt-2 text-xl font-semibold text-gray-700">{data[year][semester].title}</h3>
                    <ul className="space-y-3">
                      {data[year][semester].courses.map((course, index) => (
                        <li key={index} className="flex items-center justify-between p-4 transition duration-200 rounded-md shadow bg-gray-50 hover:bg-gray-100">
                          <span className="text-gray-800">{course}</span>
                          {isManagingCourses && (
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleEditCourse(index, year, semester)} 
                              className="p-2 text-yellow-600 transition duration-200 hover:text-yellow-500"
                              aria-label="Edit course"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              onClick={() => handleDeleteCourse(index)} 
                              className="p-2 text-red-600 transition duration-200 hover:text-red-500"
                              aria-label="Delete course"
                            >
                              <FaTrash />
                            </button>
                          </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

      {/* Edit Course Modal */}
      {editing && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">Edit Course</h3>
            <input 
              type="text" 
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.editCourseName}
              onChange={(e) => setFormData({ ...formData, editCourseName: e.target.value })}
            />
            <div className="flex space-x-2">
              <button 
                onClick={handleUpdateCourse} 
                className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button 
                onClick={() => setEditing(false)} 
                className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
