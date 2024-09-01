import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    date_of_birth: '',
    address: '',
    photo: null,
    interested_course: '',
    ioe_roll_no: '',
    ioe_rank: '',
    transcript: null,
    migration: null,
    character: null,
    agreement: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post
      ('http://192.168.1.135:8000/api/application-forms/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`,
        },
      });
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Set errors to display in the form
      }
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-blue-700' style={{ fontFamily: "'Merriweather', serif" }}>
          APPLY YOUR JEC <br />ADMISSION FORM ONLINE
        </h1>
      </div>

      <div className='flex flex-col md:flex-row md:justify-between items-center'>
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <p className='text-lg' style={{ fontFamily: "'Merriweather', serif" }}>
            Applying for admission to Janakpur Engineering College (JEC) is now easier than ever with our online application form. Prospective students can visit our official website, fill out the required information, upload necessary documents, and submit the form from the comfort of their homes. This streamlined process is designed to save time and ensure that all applications are processed efficiently. Don’t miss the opportunity to be part of JEC’s vibrant academic community. Apply online today and take the first step towards a promising engineering career!
          </p>
        </div>
        {/* <div className='md:w-1/2 flex justify-center'>
          <img src={apply} alt="JEC Facilities" className='w-full max-w-lg rounded-lg shadow-lg' />
        </div> */}
      </div>

      <div className='my-12'>
        <h1 className='text-3xl font-bold text-blue-700 text-center' style={{ fontFamily: "'Merriweather', serif" }}>
          APPLICATION FORM
        </h1>
      </div>

      <form className='space-y-8' onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/2'>
            <label className='block text-lg font-bold mb-2' style={{ fontFamily: "'Merriweather', serif" }}>
              FULL NAME:
              <input
                type='text'
                name='full_name'
                value={formData.full_name}
                onChange={handleChange}
                className={`block w-full border ${errors.full_name ? 'border-red-700' : 'border-blue-700'} rounded-lg px-4 py-2 mt-2`}
                required
              />
              {errors.full_name && <p className='text-red-700'>{errors.full_name}</p>}
            </label>

            <div className='mb-4'>
              <label className='block text-lg font-bold mb-2' style={{ fontFamily: "'Merriweather', serif" }}>
                GENDER:
              </label>
              <div className='flex gap-4'>
                <label className='flex items-center'>
                  <input type="radio" name="gender" value="M" onChange={handleChange} className='mr-2' required />
                  MALE
                </label>
                <label className='flex items-center'>
                  <input type="radio" name="gender" value="F" onChange={handleChange} className='mr-2' required />
                  FEMALE
                </label>
                <label className='flex items-center'>
                  <input type="radio" name="gender" value="O" onChange={handleChange} className='mr-2' required />
                  OTHERS
                </label>
              </div>
              {errors.gender && <p className='text-red-700'>{errors.gender}</p>}
            </div>

            <label className='block text-lg font-bold mb-2' style={{ fontFamily: "'Merriweather', serif" }}>
              DATE OF BIRTH:
              <input
                type='date'
                name='date_of_birth'
                value={formData.date_of_birth}
                onChange={handleChange}
                className='block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2'
                required
              />
              {errors.date_of_birth && <p className='text-red-700'>{errors.date_of_birth}</p>}
            </label>

            <label className='block text-lg font-bold mb-2 mt-3' style={{ fontFamily: "'Merriweather', serif" }}>
              ADDRESS:
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2'
                required
              />
              {errors.address && <p className='text-red-700'>{errors.address}</p>}
            </label>
          </div>

          <div className='md:w-1/2 flex flex-col items-center'>
            <label className='text-lg font-bold mb-2' style={{ fontFamily: "'Merriweather', serif" }}>
              PHOTO
              <input
                type='file'
                name='photo'
                onChange={handleChange}
                className='block border border-blue-700 rounded-lg px-4 py-2 mt-2'
                required
              />
              {errors.photo && <p className='text-red-700'>{errors.photo}</p>}
            </label>
          </div>
        </div>

        <div className=''>
          <h1 className='text-2xl font-bold text-red-700' style={{ fontFamily: "'Merriweather', serif" }}>
            Choose The Interested interested_course
          </h1>
          <div className='flex flex-row mt-4 gap-5'>
            <label className='flex '>
              <input type="radio" name="interested_course" value="civil" onChange={handleChange} className='mr-2' required />
              B.E Civil
            </label>
            <label className='flex '>
              <input type="radio" name="interested_course" value="computer" onChange={handleChange} className='mr-2' required />
              B.E Computer
            </label>
            <label className='flex '>
              <input type="radio" name="interested_course" value="electronics" onChange={handleChange} className='mr-2' required />
              B.E Electronics
            </label>
          </div>
          {errors.interested_course && <p className='text-red-700'>{errors.interested_course}</p>}
        </div>

        <div className='space-y-8'>
          <div>
            <h1 className='text-2xl font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              IOE INFORMATION
            </h1>
            <div className='flex flex-col md:flex-row gap-8 mt-4'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label className='text-lg font-bold mb-2'>
                  IOE ROLL.NO
                  <input
                    type='text'
                    name='ioe_roll_no'
                    value={formData.ioe_roll_no}
                    onChange={handleChange}
                    className='block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2'
                    required
                  />
                  {errors.ioe_roll_no && <p className='text-red-700'>{errors.ioe_roll_no}</p>}
                </label>
              </div>

              <div className='flex flex-col w-full md:w-1/2'>
                <label className='text-lg font-bold mb-2'>
                  IOE RANK
                  <input
                    type='text'
                    name='ioe_rank'
                    value={formData.ioe_rank}
                    onChange={handleChange}
                    className='block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2'
                    required
                  />
                  {errors.ioe_rank && <p className='text-red-700'>{errors.ioe_rank}</p>}
                </label>
              </div>
            </div>
          </div>

          <div>
            <h1 className='text-2xl font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              DOCUMENTS UPLOAD
            </h1>
            <div className='flex flex-col md:flex-row gap-8 mt-4'>
              <div className='flex flex-col w-full md:w-1/3'>
                <label className='text-lg font-bold mb-2'>
                  TRANSCRIPT
                  <input
                    type='file'
                    name='transcript'
                    onChange={handleChange}
                    className='block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2'
                    required
                  />
                  {errors.transcript && <p className='text-red-700'>{errors.transcript}</p>}
                </label>
              </div>

              <div className='flex flex-col w-full md:w-1/3'>
                <label className='text-lg font-bold mb-2'>
                  MIGRATION
                  <input
                    type='file'
                    name='migration'
                    onChange={handleChange}
                    className='block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2'
                    required
                  />
                  {errors.migration && <p className='text-red-700'>{errors.migration}</p>}
                </label>
              </div>

              <div className='flex flex-col w-full md:w-1/3'>
                <label className='text-lg font-bold mb-2'>
                  CHARACTER CERTIFICATE
                  <input
                    type='file'
                    name='character'
                    onChange={handleChange}
                    className='block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2'
                    required
                  />
                  {errors.character && <p className='text-red-700'>{errors.character}</p>}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='text-center'>
          <label className='text-lg font-bold'>
            <input
              type='checkbox'
              name='agreement'
              checked={formData.agreement}
              onChange={handleChange}
              className='mr-2'
              required
            />
            I agree to the terms and conditions.
          </label>
          {errors.agreement && <p className='text-red-700'>{errors.agreement}</p>}
        </div> */}

        <div className='text-center'>
          <button
            type='submit'
            className='bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900'
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Submit
          </button>
        </div>
      </form>

      <div className='text-center mt-8'>
        <h1 className='text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
          IF YOU HAVE ALREADY APPLIED FOR THIS FORM.
        </h1>
        <Link
          to='/printForm'
          className='text-blue-700 hover:text-red-700 text-lg font-bold underline mt-4'
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          CHECK FORM STATUS
        </Link>
      </div>
    </div>
  );
};

export default ViewForm;
