import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import { IntroductionSection } from "./IntroductionSection";
import Updates from "./Updates";
import Events from "./Events/Events";
import AboutUniversity from "./AboutUniversity";
import Course from "./Course";
import Cardslider from "./Cardslider";
import LatestUpdate from "./LatestUpdate";
import ExclusiveNews from "../News/ExclusiveNews";

export const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => clearTimeout(timer);
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
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-md mx-auto">
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 text-white text-xl bg-gray-800 rounded-full p-4"
            >
              X
            </button>
            <ExclusiveNews className='w-[80%] mx-auto' />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
