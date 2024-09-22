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
                className="bg-blue-800 px-4 py-2 rounded-lg text-white text-lg"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Done" : "Edit"}
              </button>
            )}
          </div>
        <NewsBody/>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {editMode && (
              <div className="py-4 px-7">
                <button
                  className="p-4 border bg-blue-700 rounded-lg"
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
                  <div className="card mx-auto max-w-sm rounded-lg shadow-lg relative p-6">
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
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter image"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="card-body p-2">
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
                          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter author name"
                          value={newNews.publisher}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-4 flex items-center">
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
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 mx-4">
        {newsList.map((news) => (
          <div
            key={news.id}
            className="col-span-1 bg-white border border-gray-300 rounded-lg shadow-md p-2"
          >
           <a href={news.photo} download>
            <img
              src={news.photo}
              alt="news"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
           </a>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {news.title}
            </h2>
            <p className="text-gray-700 mb-2">{news.description}</p>
            <p className="text-gray-500 mb-2">{news.date}</p>
            <p className="text-gray-500 mb-4">{news.publisher}</p>
            <p>{news.is_exclusive ? "" : ""}</p>
            {editMode && isAdmin && (
              <button
                onClick={() => handleDelete(news.id)}
                className="text-red-600 hover:text-red-800"
              >
                <AiFillDelete className="text-2xl" />
              </button>
            )}
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
