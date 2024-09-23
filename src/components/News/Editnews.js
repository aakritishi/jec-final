import React, { useState } from 'react';
import axios from 'axios';

export default function EditNews({ news, setNewsList, newsList, handleCancelEdit }) {
  const [updatedNews, setUpdatedNews] = useState(news);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedNews({ ...updatedNews, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const token = localStorage.getItem('authToken');

    axios.put(`https://jec.edu.np/api/news/${news.id}/`, updatedNews, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
    .then(response => {
      // Update the news list with the updated news item
      const updatedNewsList = newsList.map(item => 
        item.id === response.data.id ? response.data : item
      );
      setNewsList(updatedNewsList);
      handleCancelEdit(); // Exit edit mode
    })
    .catch(error => {
      console.error("There was an error updating the news item", error);
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleFormSubmit} className="container">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            News Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter news title"
            value={updatedNews.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter news description"
            value={updatedNews.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            Update News
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-4 py-2 ml-4 text-white bg-red-500 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
