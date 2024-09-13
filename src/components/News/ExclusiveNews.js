import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Exclusive.css";
import { Link } from 'react-router-dom';

const ExclusiveNews = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
    //   const token = localStorage.getItem('authToken');
      const response = await axios.get("https://jec.edu.np/exclusive-news/", {
        headers: {
          'Content-Type': 'multipart/form-data',
        //   'Authorization': `Token ${token}`,
        },
      });
      setNewsItems(response.data); 
      console.log(response);
    } catch (error) {
      console.error("There was an error fetching the news items", error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="exclusive-news-slider container w-full mx-auto my-8 px-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">All News</h2>
      {newsItems.length > 0 ? (
        <Slider {...sliderSettings}>
          {newsItems.map(news => (
            <div key={news.id} className="news-item w-[90%] mx-auto p-2 bg-white border border-gray-300 rounded-lg shadow-md">
              <Link to='/news'>
                <img
                  src={news.photo}
                  alt="news"
                  className="responsive-image mb-4 mx-auto"
                  style={{ width: '80%' }}
                />
              </Link>
              <p className="text-gray-700 mb-2">{news.description}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-600">No news available</p>
      )}
    </div>
  );
};

export default ExclusiveNews;
