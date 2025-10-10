import React, { useState, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import NewsBody from "./NewsBody";
import EditNews from "./Editnews"; // Import the EditNews component
import AddNews from "./AddNews";

export default function News() {
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null); // State to track the news to edit

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("https://jec.edu.np/api/user/", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.data.is_staff) {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user data", error);
      });

    fetchNewsItems();
  }, []);

  const fetchNewsItems = () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .get("https://jec.edu.np/api/news/", config)
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the news items", error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`https://jec.edu.np/api/news/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setNewsList(newsList.filter((news) => news.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the news item", error);
      });
  };

  const handleNewsFormToggle = () => {
    setShowNewsForm(!showNewsForm);
  };

  const handleEdit = (news) => {
    setSelectedNews(news); 
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
          <NewsBody />
        </div>

        {editMode && isAdmin && (
          <div className="py-4 px-7">
            <button
              className="p-4 bg-blue-700 border rounded-lg"
              onClick={handleNewsFormToggle}
            >
              <CgMathPlus className="text-2xl font-bold text-white" />
              <p className="text-lg font-semibold text-white ">
                Add news and event
              </p>
            </button>
          </div>
        )}

        {showNewsForm && (
          <AddNews setNewsList={setNewsList} setShowNewsForm={setShowNewsForm} newsList={newsList} />
        )}

        {selectedNews && (
          <EditNews
            news={selectedNews}
            setNewsList={setNewsList}
            setSelectedNews={setSelectedNews}
            newsList={newsList}
          />
        )}

        <div className="grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="relative col-span-1 p-5 transition-transform border border-gray-200 shadow-lg bg-gradient-to-r from-white via-gray-50 to-white rounded-2xl hover:shadow-2xl hover:scale-105"
            >
              <a
                href={news.photo}
                download
                className="block overflow-hidden rounded-lg"
              >
                {news.photo &&
                  (() => {
                    const imageExtension = news.photo
                      .split(".")
                      .pop()
                      ?.toLowerCase();
                    const isImage = [
                      "jpg",
                      "jpeg",
                      "png",
                      "gif",
                      "bmp",
                      "webp",
                    ].includes(imageExtension);
                    return isImage ? (
                      <img
                        src={news.photo}
                        alt="news"
                        className="object-cover w-full h-48 transition-transform duration-300 transform hover:scale-110"
                      />
                    ) : (
                      <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                          news.photo
                        )}&embedded=true`}
                        title="news"
                        className="object-cover w-full h-48 transition-transform duration-300 transform hover:scale-110"
                      />
                    );
                  })()}
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
                      if (
                        window.confirm(
                          "Are you sure you want to delete this news item?"
                        )
                      ) {
                        handleDelete(news.id);
                      }
                    }}
                    className="p-2 text-red-600 transition-all duration-300 ease-in-out bg-red-100 rounded-full hover:bg-red-200"
                  >
                    <AiFillDelete className="text-2xl" />
                  </button>
                  <button
                    onClick={() => handleEdit(news)} // Trigger edit
                    style={{ fontFamily: "'Merriweather', serif" }}
                    className="flex items-center justify-center px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    Edit News
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
