import React from 'react'

export default function Civil() {
  return (
    <div className='container'>
    <div className='row'>
      {/* First Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>FIRST YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Computer Programming', 'Engineering Chemistry', 'Engineering Drawing I', 'Engineering Mathematics I', 'Fundamentals of Thermodynamics and Heat Transfer', 'Workshop Technology'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>I/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Basic Electrical Engineering', 'Engineering Electronics', 'Engineering Drawing II', 'Basic Mathematics II', 'Engineering Physics', 'Applied Mechanics'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>I/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      {/* Second Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>SECOND YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Applied Mechanics(Dynamics)', 'Engineering Geology I', 'Engineering Mathematics III', 'Civil Engineering Materials', 'Fluid Mechanics', 'Strength of Materials', 'Surveying I'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>II/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Engineering Geology II', 'Hydraulics', 'Probability And Statistics', 'Theory Of Structures I', 'Building Drawing', 'Soil Mechanics', 'Surveying II'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>II/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    <div className='mt-5 row'>
      {/* Third Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>THIRD YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Concrete Technology And Masonry Structures', 'Engineering Hydrology', 'Foundation Engineering', 'Theory Of Structures', 'Water Supply Engineering', 'Numerical Method', 'Survey Camp'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>III/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Design Of Steel And Timber Structures', 'Irrigation And Drainage Engineering', 'Sanitary Engineering', 'Transportation Engineering I', 'Building Technology', 'Communication English', 'Engineering Economics'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>III/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      {/* Fourth Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>FOURTH YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Design Of Reinforced Concrete Structures', 'Hydropower Engineering', 'Project Work I', 'Transportation Engineering II', 'Elective-I', 'Estimating And Costing', 'Project Engineering'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>IV/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Computational Techniques In Civil Engineering', 'Project Work II', 'Construction Management', 'Elective-II', 'Elective-III', 'Engineering Professional Practice', 'Technology Environment And Society'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>IV/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}
