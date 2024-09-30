import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import about from "../images/jec-about.png";
import students from "../images/jec-students.jpg";
export default function Introduction() {
  const [data, setData] = useState({
    students: 0,
    professors: 0,
    principal: { name: "", photo: "", description: "" },
    chairman: { name: "", photo: "", description: "" },
  });

  const [adminData, setAdminData] = useState({
    students: data.students,
    professors: data.professors,
    principalDescription: data.principal.description,
    principalPhoto: null,
    chairmanDescription: data.chairman.description,
    chairmanPhoto: null,
  });

  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    // Fetch dynamic data from the server
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setAdminData({
          students: data.students,
          professors: data.professors,
          principalDescription: data.principal.description,
          principalPhoto: null, // Reset to null for file upload
          chairmanDescription: data.chairman.description,
          chairmanPhoto: null, // Reset to null for file upload
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAdminData({
        ...adminData,
        [name]: reader.result, // Set the image data as a base64 string
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the server (admin update)
    fetch("/api/data", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    })
      .then((response) => response.json())
      .then((updatedData) => setData(updatedData))
      .catch((error) => console.error("Error updating data:", error));
  };

  const toggleAdminPanel = () => {
    setShowAdminPanel((prev) => !prev);
  };

  return (
    <>
      <div
        className="container mx-auto px-4 py-8"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        <div className="sm:mx-0 md:mx-6 lg:mx-16">
          <div className="my-3">
            <h1 className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-semibold text-blue-600 transition-transform transform text-justify">
              We are a research institution focused on providing massive <br />
              opportunities through value education. University is one of the
              <br />
              world’s preeminent public universities.
            </h1>
          </div>
          <br />
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div className="md:w-7/12 w-full text-justify">
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Our impact on individuals, our region, and the world is profound
                whether we are launching young people into a boundless future or
                confronting the grand challenges of our time through undaunted
                research and scholarship. We turn ideas into impact and
                transform lives and our world.
                <br />
                <br />
                In a sense, University’s greatest invention may be itself an
                unusual concentration of unusual talent, forever reinventing
                itself on a mission to make a better world. That invention is
                powered by individuals: a global community of educators,
                researchers, and learners with different perspectives but a
                shared commitment to serving humanity. Come, join us on the
                journey.
              </p>
            </div>
            <div className="md:w-5/12 w-full">
              <img
                src={students}
                className="rounded-lg border-2 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-auto w-full md:w-[400px] lg:w-[500px] transform hover:scale-105"
                alt="Students"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mb-8 mt-24">
        <div
          className="w-full max-w-[1100px] h-[380px] rounded-lg relative overflow-hidden"
          style={{
              backgroundImage: `url(${about})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
    </div>
      <button
        onClick={toggleAdminPanel}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out mb-6"
      >
        {showAdminPanel ? "Hide Admin Panel" : "Show Admin Panel"}
      </button>

      {/* Admin Form to Update Information */}
      {showAdminPanel && (
        <div className="container mb-12 p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-all duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel - Update Data</h2>
          <form onSubmit={handleAdminSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Number of Students</label>
              <input
                type="number"
                name="students"
                value={adminData.students}
                onChange={handleAdminInputChange}
                className="input-field w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Number of Professors</label>
              <input
                type="number"
                name="professors"
                value={adminData.professors}
                onChange={handleAdminInputChange}
                className="input-field w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Principal's Description</label>
              <textarea
                name="principalDescription"
                value={adminData.principalDescription}
                onChange={handleAdminInputChange}
                className="input-field w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Principal's Photo</label>
              <input
                type="file"
                name="principalPhoto"
                onChange={handleFileChange}
                className="input-field w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                accept="image/*"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Chairman's Description</label>
              <textarea
                name="chairmanDescription"
                value={adminData.chairmanDescription}
                onChange={handleAdminInputChange}
                className="input-field w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Chairman's Photo</label>
              <input
                type="file"
                name="chairmanPhoto"
                onChange={handleFileChange}
                className="input-field w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                accept="image/*"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
            >
              Update Data
            </button>
          </form>
        </div>
      )}

      {/* Other content (counters, principal, chairman sections) remain unchanged... */}
      {/* Students and Professors Counter */}
      <div className="container mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center text-center">
          <div className="md:w-1/3 p-4">
            <h1 className="text-4xl font-bold text-blue-600">
              <CountUp end={data.students} duration={2} />
            </h1>
            <p className="text-lg mt-2 text-gray-700">STUDENTS</p>
          </div>
          <div className="md:w-1/3 p-4">
            <h1 className="text-4xl font-bold text-blue-600">
              <CountUp end={data.professors} duration={2} />
            </h1>
            <p className="text-lg mt-2 text-gray-700">PROFESSORS</p>
          </div>
        </div>
      </div>

      {/* Principal Section */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 mb-12">
          <div className="lg:w-1/2 p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Meet Our Principal</h1>
            <p className="mb-6 text-gray-950 text-justify">{data.principal.description}</p>
          
          </div>
          <div className="lg:w-1/2 p-4">
          <img
              src={data.principal.photo}
              className="w-full h-auto rounded-lg shadow-2xl"
              alt="Principal"
            />
          </div>
        </div>

        {/* Chairman Section */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-12">
        <img
              src={data.chairman.photo}
              className="w-full h-auto rounded-lg shadow-2xl"
              alt="Chairman"
            />
          <div className="lg:w-1/2 p-4">
           
              <div className="lg:w-1/2 p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Meet Our Chairperson</h1>
            <p className="mb-6 text-gray-950 text-justify">{data.chairman.description}</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
