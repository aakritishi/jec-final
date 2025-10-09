import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Exclusive.css"; // Optional: Import a custom CSS file for additional styling

const Exclnews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const desktopSwiperRef = useRef(null);
  const mobileSwiperRef = useRef(null);

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
      const response = await axios.get(
        "https://jec.edu.np/api/exclusive-news/"
      );
      setNewsItems(response.data);
    } catch (error) {
      console.error("There was an error fetching the news items", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handlePrevClick = () => {
    const swiper =
      window.innerWidth >= 768
        ? desktopSwiperRef.current?.swiper
        : mobileSwiperRef.current?.swiper;

    if (swiper && currentIndex > 0) swiper.slidePrev();
  };

  const handleNextClick = () => {
    const swiper =
      window.innerWidth >= 768
        ? desktopSwiperRef.current?.swiper
        : mobileSwiperRef.current?.swiper;

    if (swiper && currentIndex < newsItems.length - 1) swiper.slideNext();
  };

  const isImage = (url) => {
    if (!url) return false;
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const ext = url.split(".").pop()?.toLowerCase();
    return imageExtensions.includes(ext);
  };

  const getPDFFrameSrc = (url) => {
    return `${url}#toolbar=0&navpanes=0&scrollbar=0`;
  };

  return (
    <>
      <div
        className=" hidden md:flex "
        style={{
          position: "relative",
          width: "900px",
          height: "650px",
          overflow: "visible",
        }}
      >
        <Swiper
          ref={desktopSwiperRef}
          spaceBetween={20} 
          slidesPerView={1} 
          onSlideChange={handleSlideChange} 
          className="swiper-container"
        >
          {loading ? (
            <SwiperSlide>
              <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md text-center">
                <p className="text-gray-700">Loading...</p>{" "}
                {/* Loading indicator */}
              </div>
            </SwiperSlide>
          ) : newsItems.length > 0 ? (
            newsItems.map((news) => (
              <SwiperSlide key={news.id} className="news-slide">
                <div className="news-item p-0 bg-white border border-gray-300 rounded-lg shadow-md">
                  <h3
                    className="text-center font-bold text-xl px-4"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {news.title}
                  </h3>
                  <a
                    href={news.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {news.photo && isImage(news.photo) ? (
                      <img
                        src={news.photo}
                        alt="news"
                        className="responsive-image h-auto w-auto mb-4 mx-auto object-cover rounded-lg"
                      />
                    ) : (
                      <iframe
                          src={getPDFFrameSrc(news.photo)}
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        />
                    )}
                  </a>
                  <p className="text-gray-700">{news.description}</p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              1{" "}
              <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                <p className="text-gray-700 text-center">No news available</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Left and right arrows */}
        {currentIndex > 0 && (
          <div
            className="swiper-button-prev"
            style={{ ...arrowStyle, left: "10px" }}
            onClick={handlePrevClick}
          >
            &#10094; {/* Left arrow icon */}
          </div>
        )}
        {currentIndex < newsItems.length - 1 && (
          <div
            className="swiper-button-next"
            style={{ ...arrowStyle, right: "10px" }}
            onClick={handleNextClick}
          >
            &#10095; {/* Right arrow icon */}
          </div>
        )}
      </div>

      <div
        className="md:hidden mx-auto"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Swiper
          ref={mobileSwiperRef}
          spaceBetween={20} 
          slidesPerView={1} 
          onSlideChange={handleSlideChange} 
          className="swiper-container"
        >
          {loading ? (
            <SwiperSlide>
              <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md text-center">
                <p className="text-gray-700">Loading...</p>{" "}
                {/* Loading indicator */}
              </div>
            </SwiperSlide>
          ) : newsItems.length > 0 ? (
            newsItems.map((news) => (
              <SwiperSlide key={news.id} className="news-slide">
                <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                  <h3
                    className="text-center font-bold text-xl px-4"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {news.title}
                  </h3>
                  <a
                    href={news.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {news.photo && isImage(news.photo) ? (
                      <img
                        src={news.photo}
                        alt="news"
                        className="responsive-image h-auto w-auto mb-4 mx-auto object-cover rounded-lg"
                      />
                    ) : (
                      <iframe
                        src={getPDFFrameSrc(news.photo)}
                        className="absolute top-0 left-0 w-full h-[900px] object-contain rounded-lg"
                      />
                    )}
                  </a>
                  <p className="text-gray-700">{news.description}</p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              1{" "}
              <div className="news-item p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                <p className="text-gray-700 text-center">No news available</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Left and right arrows */}
        {currentIndex > 0 && (
          <div
            className="swiper-button-prev"
            style={{ ...arrowStyle, left: "10px" }}
            onClick={handlePrevClick}
          >
            &#10094; {/* Left arrow icon */}
          </div>
        )}
        {currentIndex < newsItems.length - 1 && (
          <div
            className="swiper-button-next"
            style={{ ...arrowStyle, right: "10px" }}
            onClick={handleNextClick}
          >
            &#10095; {/* Right arrow icon */}
          </div>
        )}
      </div>
    </>
  );
};

const arrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#333",
  cursor: "pointer",
  zIndex: 10,
  background: "rgba(255, 255, 255, 0.7)", // Semi-transparent background for better visibility
  padding: "10px",
  borderRadius: "50%",
};

export default Exclnews;
