import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import { IntroductionSection } from "./IntroductionSection";
import Updates from "./Updates";
import Events from "./Events/Events";
import AboutUniversity from "./AboutUniversity";
import Course from "./Course";
import Cardslider from "./Cardslider";
import LatestUpdate from "./LatestUpdate";
import Exclnews from "../News/Exclnews";

export const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 500); // Show overlay after 500ms

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="w-[94%] mx-auto">
        <IntroductionSection />
        <Updates />
        <LatestUpdate />
        <Events />
        <AboutUniversity />
        <ImageSlider />
        <Course />
        {/* <Cardslider /> */}

        {showOverlay && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black bg-opacity-70 backdrop-blur-md"
            aria-hidden={!showOverlay}
          >
            <div className="relative max-w-md p-6 mx-auto transition-transform duration-500 transform scale-100 bg-white shadow-lg rounded-xl">
              <button
                onClick={handleCloseOverlay}
                aria-label="Close overlay"
                className="absolute z-50 p-2 text-gray-600 transition-transform transform bg-gray-200 rounded-full top-3 right-3 hover:bg-gray-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Exclnews className="w-full p-4 mx-auto" />
            </div>
          </div>
        )}
      </div>
  
  );
};

export default Home;
