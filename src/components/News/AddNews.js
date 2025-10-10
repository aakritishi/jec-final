import axios from "axios";
import React, { useState } from "react";

const AddNews = ({ setNewsList, newsList, setShowNewsForm }) => {
  const [newNews, setNewNews] = useState({
    photo: "",
    title: "",
    description: "",
    date: "",
    publisher: "",
    is_exclusive: false,
    priority: "",
  });
  const [isExclusive, setIsExclusive] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewNews({
      ...newNews,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleExclusiveChange = (e) => {
    const checked = e.target.checked;
    setIsExclusive(checked);
    setNewNews({ ...newNews, is_exclusive: checked });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("photo", newNews.photo);
    formData.append("title", newNews.title);
    formData.append("description", newNews.description);
    formData.append("date", newNews.date);
    formData.append("publisher", newNews.publisher);
    formData.append("is_exclusive", isExclusive);
    formData.append("priority", newNews.priority);

    axios
      .post("https://jec.edu.np/api/news/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setNewsList([...newsList, response.data]);
        setShowNewsForm(false);
        setNewNews({
          photo: "",
          title: "",
          description: "",
          date: "",
          publisher: "",
          is_exclusive: false,
          priority: "",
        });
        setIsExclusive(false);
      })
      .catch((error) => {
        console.error("There was an error adding the news item", error);
      });
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg form-container">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700"
          >
            Photo
          </label>
          <input
            type="file"
            name="photo"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) =>
              setNewNews({ ...newNews, photo: e.target.files[0] })
            }
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={newNews.title}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={newNews.description}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            value={newNews.date}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="publisher"
            className="block text-sm font-medium text-gray-700"
          >
            Publisher
          </label>
          <input
            type="text"
            name="publisher"
            value={newNews.publisher}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_exclusive"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            checked={isExclusive}
            onChange={handleExclusiveChange}
          />
          <label
            htmlFor="is_exclusive"
            className="block ml-2 text-sm text-gray-900"
          >
            Exclusive
          </label>
        </div>

        {isExclusive && (
          <div>
            <label
              htmlFor="publisher"
              className="block text-sm font-medium text-gray-700"
            >
              Priority Number
            </label>
            <input
              type="number"
              name="priority"
              value={newNews.priority}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit News
        </button>
      </form>
    </div>
  );
};

export default AddNews;
