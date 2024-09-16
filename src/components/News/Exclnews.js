import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Exclnews = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
      const response = await axios.get("https://jec.edu.np/api/exclusive-news/");
      setNewsItems(response.data);
    } catch (error) {
      console.error("There was an error fetching the news items", error);
    }
  };

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1} // Display one image at a time
      onSlideChange={() => console.log('Slide changed')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {newsItems.length > 0 ? (
        newsItems.map(news => (
          <SwiperSlide key={news.id} className="news-slide">
            <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md">
              <img
                src={news.photo} // Use the fetched photo URL
                alt="news"
                className="responsive-image mb-4 mx-auto"
                style={{ width: '100%' }}
              />
              <p className="text-gray-700">{news.description}</p>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md">
            <p className="text-gray-700 text-center">No news available</p>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default Exclnews;
