import React, { useState, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import NewsBody from "./NewsBody";
// import ExclusiveNews from "./ExclusiveNews";

export default function News() {
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({
    photo: "",
    title: "",
    description: "",
    date: "",
    publisher: "",
    is_exclusive: false
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios.get("https://jec.edu.np/api/user/", {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
    })
    .then(response => {
      if (response.data.is_staff) {
        setIsAdmin(true);
      }
    })
    .catch(error => {
      console.error("There was an error fetching the user data", error);
    });

    fetchNewsItems();
  }, []);

  const fetchNewsItems = () => {
    //const token = localStorage.getItem('authToken');
    //axios.get("https://jec.edu.np/api/news/", {
      //headers: {
        //'Content-Type': 'multipart/form-data',
        //'Authorization': `Token ${token}`,
      //},
    //})
    //.then(response => {
      //setNewsList(response.data);
    //})
    //.catch(error => {
      //console.error("There was an error fetching the news items", error);
    //});
  //};
   const config ={
     headers: {
       'Content-Type': 'multipart/form-data',
     },
   };
   
   axios.get("https://jec.edu.np/api/news/", config)
     .then(response => {
        setNewsList(response.data);
     })
     .catch(error => {
       console.error("There was an error fetching the news items", error);
     });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'photo') {
      console.log("response", e.target.files);
      setNewNews({
        ...newNews,
        [name]: e.target.files[0]
      });
    } else {
      setNewNews({
        ...newNews,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('photo', newNews.photo);
    formData.append('title', newNews.title);
    formData.append('description', newNews.description);
    formData.append('date', newNews.date);
    formData.append('publisher', newNews.publisher);
    formData.append('is_exclusive', newNews.is_exclusive);

    axios.post("https://jec.edu.np/api/news/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
    })
    .then(response => {
      setNewsList([response.data, ...newsList]);
      setNewNews({
        photo: "",
        title: "",
        description: "",
        date: "",
        publisher: "",
        is_exclusive: false
      });
      setShowNewsForm(false);
    })
    .catch(error => {
      console.error("There was an error posting the news item", error);
    });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('authToken');
  
    axios.delete(`https://jec.edu.np/api/news/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
    .then(response => {
      setNewsList(newsList.filter(news => news.id !== id));
    })
    .catch(error => {
      console.error("There was an error deleting the news item", error);
    });
  };

  const handleNewsFormToggle = () => {
    setShowNewsForm(!showNewsForm);
  };

  return (
    <>
      <div className="sm:mx-[20px] md:mx-[120px] w-[94%] mx-auto">
        <div
          className="mt-2"
          style={{ fontFamily: "'Merriweather', serif", color: "#003366" }}
        >
          <div className="flex justify-between">
            <h1 className="text-[40px] text-red-600 transition-all duration-500 hover:text-red-800">
              News & Updates
            </h1>
            {isAdmin && (
              <button
                className="px-4 py-2 text-lg text-white bg-green-500 rounded-lg"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Done" : "Edit"}
              </button>
            )}
          </div>
        <NewsBody/>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {editMode && (
              <div className="py-4 px-7">
                <button
                  className="p-4 bg-blue-700 border rounded-lg"
                  onClick={handleNewsFormToggle}
                >
                  <CgMathPlus className="text-2xl font-bold text-white" />
                  <p className="text-lg font-semibold text-white">
                    Add news and event
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>

        {showNewsForm && editMode && (
          <div className="w-full">
            <form onSubmit={handleFormSubmit} className="container">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 mb-[30px]">
                  <div className="relative max-w-sm p-6 mx-auto rounded-lg shadow-lg card">
                    <div className="relative">
                      <label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image
                      </label>
                      <input
                        id="imageUrl"
                        type="file"
                        name="photo"
                        className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter image"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="p-2 card-body">
                      <div className="mb-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          News Title
                        </label>
                        <input
                          id="title"
                          type="text"
                          name="title"
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter news title"
                          value={newNews.title}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <input
                          id="description"
                          type="text"
                          name="description"
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter news description"
                          value={newNews.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date
                        </label>
                        <input
                          id="date"
                          type="date"
                          name="date"
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={newNews.date}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="publisher"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author Name
                        </label>
                        <input
                          id="publisher"
                          type="text"
                          name="publisher"
                          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter author name"
                          value={newNews.publisher}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex items-center mb-4">
                        <input
                          id="is_exclusive"
                          type="checkbox"
                          name="is_exclusive"
                          className="mr-2"
                          checked={newNews.is_exclusive}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="is_exclusive"
                          className="text-sm font-medium text-gray-700"
                        >
                          Exclusive News
                        </label>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          // onClick={}
                          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                        >
                          Add News
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
<div className="grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2 lg:grid-cols-3">
  {newsList.map((news) => (
    <div
      key={news.id}
      className="relative col-span-1 p-5 transition-transform border border-gray-200 shadow-lg bg-gradient-to-r from-white via-gray-50 to-white rounded-2xl hover:shadow-2xl hover:scale-105"
    >
      <a href={news.photo} download className="block overflow-hidden rounded-lg">
        <img
          src={news.photo}
          alt="news"
          className="object-cover w-full h-48 transition-transform duration-500 ease-in-out transform border-2 hover:scale-110 "
        />
      </a>
      <h2
        className="mt-4 text-xl font-bold tracking-wide text-gray-800"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        {news.title}
      </h2>
      <p className="mt-3 mb-2 leading-relaxed text-gray-700">
        {news.description}
      </p>
      <p
        className="mt-1 text-sm text-gray-500"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        {news.date}
      </p>
      <p
        className="text-sm text-gray-500"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        {news.publisher}
      </p>

      {editMode && isAdmin && (
        <div className="flex justify-between mt-5 space-x-4">
        <button
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      handleDelete(news.id);
    }
  }}
  className="p-2 text-red-600 transition-all duration-300 ease-in-out bg-red-100 rounded-full hover:bg-red-200"
>
  <AiFillDelete className="text-2xl" />
</button>

          <button
            style={{ fontFamily: "'Merriweather', serif" }}
            className="flex items-center justify-center px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  ))}
</div>


      </div>
    </>
  );
}
