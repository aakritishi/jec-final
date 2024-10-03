import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Header } from '../../Navbar/Header';

export default function Civil() {
  const [data, setData] = useState({
    first: { I: { title: 'I', credit_hours: 18, subjects: [] }, II: { title: 'II', credit_hours: 18, courses: [] }},
    second: { I: { title: 'I', credit_hours: 18,subjects: [] }, II: { title: 'II', credit_hours: 18, courses: [] }},
    third: { I: { title: 'I', credit_hours: 18, subjects: [] }, II: { title: 'II', credit_hours: 18, courses: [] }},
    fourth: { I: { title: 'I', credit_hours: 18, subjects: [] }, II: { title: 'II', credit_hours: 18, courses: [] }},
  });

  const [formData, setFormData] = useState({
    newCourse: '',
    credit_hours: 18, // Default credit hours
    editCourseIndex: null,
    editCourseName: '',
    currentYear: 'frist',
    currentSemester: 'I'
  });

  const [editing, setEditing] = useState(false);
  const [isManagingCourses, setIsManagingCourses] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('http://192.168.1.136:8000/api/structure');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (formData.newCourse) {
      const updatedCourses = [...data[formData.currentYear][formData.currentSemester].courses, formData.newCourse];
      const updatedcredit_hours = formData.credit_hours + 3; // Assuming each course is worth 3 credit hours

      const newData = {
        ...data,
        [formData.currentYear]: {
          ...data[formData.currentYear],
          [formData.currentSemester]: {
            ...data[formData.currentYear][formData.currentSemester],
            courses: updatedCourses,
            credit_hours: updatedcredit_hours // Update the credit hours
          }
        }
      };
      setData(newData);

      const token = localStorage.getItem("authToken");
      try {
        await axios.post('http://192.168.1.136:8000/api/structure/', 
        { 
          year: formData.currentYear,
          semester: formData.currentSemester,
          newCourse: formData.newCourse,
          credit_hours: updatedcredit_hours // Send the updated credit hours to the server
        },
        { headers: { Authorization: `Token ${token}` } });
      } catch (error) {
        console.error("Error adding course:", error.response ? error.response.data : error.message);
      }

      setFormData({ ...formData, newCourse: '', credit_hours: updatedcredit_hours }); // Reset new course and credit hours
    }
  };

  const handleEditCourse = (index, year, semester) => {
    const courseName = data[year][semester].courses[index];
    setFormData({ 
      ...formData, 
      editCourseIndex: index, 
      editCourseName: courseName, 
      currentYear: year, 
      currentSemester: semester,
      credit_hours: data[year][semester].credit_hours // Set current credit hours for editing
    });
    setEditing(true);
  };

  const handleUpdateCourse = async () => {
    if (formData.editCourseName) {
      const updatedCourses = [...data[formData.currentYear][formData.currentSemester].courses];
      updatedCourses[formData.editCourseIndex] = formData.editCourseName;

      const newData = {
        ...data,
        [formData.currentYear]: {
          ...data[formData.currentYear],
          [formData.currentSemester]: {
            ...data[formData.currentYear][formData.currentSemester],
            courses: updatedCourses,
            credit_hours: formData.credit_hours // Maintain current credit hours
          }
        }
      };
      setData(newData);

      try {
        const token = localStorage.getItem("authToken");
        await axios.put(`http://192.168.1.136:8000/api/structure/${formData.editCourseIndex}/`, 
        { 
          year: formData.currentYear,
          semester: formData.currentSemester,
          newCourseName: formData.editCourseName,
          credit_hours: formData.credit_hours // Send updated credit hours to the server
        }, 
        { headers: { Authorization: `Token ${token}` } });
      } catch (error) {
        console.error("Error updating course:", error);
      }

      setFormData({ ...formData, editCourseName: '', editCourseIndex: null, credit_hours: 18 });
      setEditing(false);
    }
  };

  const handleDeleteCourse = async (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      const updatedCourses = data[formData.currentYear][formData.currentSemester].courses.filter((_, i) => i !== index);
      const updatedcredit_hours = data[formData.currentYear][formData.currentSemester].credit_hours - 3; // Decrease by 3 for each deleted course

      const newData = {
        ...data,
        [formData.currentYear]: {
          ...data[formData.currentYear],
          [formData.currentSemester]: {
            ...data[formData.currentYear][formData.currentSemester],
            courses: updatedCourses,
            credit_hours: updatedcredit_hours // Update the credit hours
          }
        }
      };
      setData(newData);

      try {
        await axios.delete('http://192.168.1.136:8000/api/structure', {
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

      {isManagingCourses && (
        <form onSubmit={(e) => e.preventDefault()} className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-center">Manage Courses</h1>

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
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="credit_hours" className="block mb-2 font-semibold">Credit Hours</label>
            <input 
              type="number" 
              id="credit_hours" 
              name="credit_hours" 
              value={formData.credit_hours} 
              onChange={(e) => setFormData({ ...formData, credit_hours: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>

          <button 
            onClick={editing ? handleUpdateCourse : handleAddCourse} 
            className='px-4 py-2 text-white bg-blue-500 rounded'
          >
            {editing ? 'Update Course' : 'Add Course'}
          </button>
        </form>
      )}

      <h1 className="mb-6 text-2xl font-bold text-center">Courses List</h1>

      {Object.keys(data).map(year => (
        <div key={year} className="mb-6">
          <h2 className="text-xl font-bold">{year.charAt(0).toUpperCase() + year.slice(1)}</h2>
          {Object.keys(data[year]).map(semester => (
            <div key={semester} className="mt-4">
              <h3 className="font-bold">{data[year][semester].title}</h3>
              <ul className="pl-6 list-disc">
                {data[year][semester].courses.map((course, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{course}</span>
                    <div>
                      <button onClick={() => handleEditCourse(index, year, semester)} className="text-blue-500 hover:underline">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteCourse(index)} className="ml-2 text-red-500 hover:underline">
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
