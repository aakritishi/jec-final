import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import uni1 from "../images/academic.png";
import uni2 from "../images/computer.jpg";
import uni3 from "../images/electronics.jpg";
import uni4 from "../images/intenship.png";
import uni5 from "../images/civil.jpg";

const ImageSlider = () => {
  const images = [
    { src: uni1, alt: "University 1" },
    { src: uni2, alt: "University 2" },
    { src: uni3, alt: "University 3" },
    { src: uni4, alt: "University 4" },
    { src: uni5, alt: "University 5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 3 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= images.length - 3;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-11/12 mx-auto overflow-hidden max-w-[90%] my-8">
      <div className="justify-center items-center w-full mx-auto">
        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <img
              key={index}
              className="w-1/4 h-64 object-cover"
              src={image.src}
              alt={image.alt}
              height={300}
              width={400}
            />
          ))}
        </div>
      </div>
      <FaAngleLeft
        className="fa fa-4x absolute top-[70%] transform -translate-y-1/2 right-8 text-4xl text-gray-700 bg-white bg-opacity-70 rounded-full p-2 cursor-pointer"
        onClick={goToPrevious}
      />
      <FaAngleRight
        className="fa fa-4x absolute top-1/2 transform -translate-y-1/2 right-2 text-4xl text-gray-700 bg-white bg-opacity-70 rounded-full p-2 cursor-pointer"
        onClick={goToNext}
      />
    </div>
  );
};

export default ImageSlider;
