import { useState, useEffect } from "react";
import { myProjects } from "../constants/index.js";

const projectCount = myProjects.length;

// Laptop Mockup Component
const LaptopDisplay = ({ images, currentImageIndex }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl">
        {/* Laptop Body */}
        <div className="relative bg-gray-800 rounded-t-2xl p-3 shadow-2xl border-4 border-gray-700">
          {/* Screen */}
          <div className="bg-black rounded-lg overflow-hidden relative aspect-video">
            <img
              src={images[currentImageIndex]}
              alt={`Screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Screen Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
          {/* Camera */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full" />
        </div>
        {/* Laptop Base */}
        <div className="relative h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-2xl">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-t-lg" />
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black/30 blur-xl rounded-full" />
      </div>
    </div>
  );
};

// Mobile Mockup Component
const MobileDisplay = ({ images, currentImageIndex }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative w-64 h-[32rem]">
        {/* Phone Body */}
        <div className="relative w-full h-full bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
          {/* Screen */}
          <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={`Screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>
        {/* Power Button */}
        <div className="absolute right-0 top-32 w-1 h-12 bg-gray-700 rounded-l-lg" />
        {/* Volume Buttons */}
        <div className="absolute left-0 top-28 w-1 h-8 bg-gray-700 rounded-r-lg" />
        <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-r-lg" />
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-black/30 blur-xl rounded-full" />
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProject = myProjects[selectedProjectIndex];
  const imageCount = currentProject.images?.length;

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProjectIndex]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [imageCount]);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const handleImageNavigation = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? imageCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === imageCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section className="c-space my-20" id="projects">
      <p className="head-text">My Selected Work</p>
      <div className="mt-12 w-full">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          {/* Project Info Card */}
          <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 border border-gray-100/10 bg-black-200/50  backdrop-blur-lg rounded-lg">
            <div className="absolute top-0 right-0 opacity-20">
              <img
                src={currentProject.spotlight}
                alt="spotlight"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div
              className="p-3 backdrop-blur-xl w-fit rounded-lg relative z-10"
              style={currentProject.logoStyle}
            >
              <img
                className="w-10 h-10"
                src={currentProject.logo}
                alt="logo"
              />
            </div>
            <div className="flex flex-col gap-5 text-white-600 my-5 relative z-10">
              <p className="text-white text-2xl font-semibold animatedText">
                {currentProject.title}
              </p>
              <p className="animatedText">{currentProject.desc}</p>
              <p className="animatedText">{currentProject.subdesc}</p>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-5 relative z-10">
              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  <div key={index} className="tech-logo">
                    <img src={tag.path} alt={tag.name} />
                  </div>
                ))}
              </div>
              <a
                className="flex items-center gap-2 cursor-pointer text-white-600"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
              >
                <p>Repo Link</p>
                <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
              </a>
            </div>
            <div className="flex justify-between items-center mt-7 relative z-10">
              <button
                className="arrow-btn"
                onClick={() => handleNavigation("previous")}
              >
                <img src="/assets/left-arrow.png" alt="left arrow" />
              </button>
              <button
                className="arrow-btn"
                onClick={() => handleNavigation("next")}
              >
                <img
                  src="/assets/right-arrow.png"
                  alt="right arrow"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Device Mockup Display */}
          <div className="relative border border-gray-100/10 bg-black-200/50  backdrop-blur-lg rounded-lg min-h-[600px] md:h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              {currentProject.displayType === "laptop" ? (
                <LaptopDisplay
                  images={currentProject.images}
                  currentImageIndex={currentImageIndex}
                />
              ) : (
                <MobileDisplay
                  images={currentProject.images}
                  currentImageIndex={currentImageIndex}
                />
              )}
            </div>

            {/* Image Navigation Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 z-10">
              <button
                onClick={() => handleImageNavigation("previous")}
                className="p-2 hover:bg-white/10 rounded-full transition flex-shrink-0"
              >
                <img
                  src="/assets/left-arrow.png"
                  alt="left arrow"
                  className="w-4 h-4"
                />
              </button>
              <div className="flex gap-2 items-center">
                {currentProject.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition flex-shrink-0 ${
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/40 hover:bg-white/60 w-2"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => handleImageNavigation("next")}
                className="p-2 hover:bg-white/10 rounded-full transition flex-shrink-0"
              >
                <img
                  src="/assets/right-arrow.png"
                  alt="right arrow"
                  className="w-4 h-4"
                />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm z-10">
              {currentImageIndex + 1} / {imageCount}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;