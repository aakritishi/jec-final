import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Exclusive.css'; // Optional: Import a custom CSS file for additional styling

const Exclnews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
      const response = await axios.get("https://jec.edu.np/api/exclusive-news/");
      setNewsItems(response.data);
    } catch (error) {
      console.error("There was an error fetching the news items", error);
    }finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (currentIndex < newsItems.length - 1) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Swiper
        ref={swiperRef}
        spaceBetween={20} // Space between slides
        slidesPerView={1} // Display one news item at a time
        onSlideChange={handleSlideChange} // Track slide changes
        className="swiper-container"
      >
       {loading ? (
          <SwiperSlide>
            <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md text-center">
              <p className="text-gray-700">Loading...</p> {/* Loading indicator */}
            </div>
          </SwiperSlide>
        ) : newsItems.length > 0 ? (
          newsItems.map((news) => (
            <SwiperSlide key={news.id} className="news-slide">
              <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md">
               <a href={news.photo} target="_blank" rel="noopener noreferrer">
                <img
                  src={news.photo} // Use the fetched photo URL
                  alt="news"
                  className="responsive-image mb-4 mx-auto"
                  style={{ width: 'auto', height: 'auto', maxHeight: '300px' }} // Style the image to fit the container
                />
               </a>
               <p className="text-gray-700">{news.description}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
1            <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md">
              <p className="text-gray-700 text-center">No news available</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Left and right arrows */}
      {currentIndex > 0 && (
        <div className="swiper-button-prev" style={{ ...arrowStyle, left: '10px'}} onClick={handlePrevClick}>
          &#10094; {/* Left arrow icon */}
        </div>
      )}
      {currentIndex < newsItems.length - 1 && (
        <div className="swiper-button-next" style={{ ...arrowStyle, right: '10px'}} onClick={handleNextClick}>
          &#10095; {/* Right arrow icon */}
        </div>
      )}
    </div>
  );
};

const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  cursor: 'pointer',
  zIndex: 10,
  background: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for better visibility
  padding: '10px',
  borderRadius: '50%',
};

export default Exclnews;
