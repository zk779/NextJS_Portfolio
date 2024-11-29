import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ProjectDialog = ({ project, onClose }) => {
  const dialogRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the image index
  const images = [project.image, project.image2].filter(Boolean); // Collecting images (image2 if exists)

  // Close the dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Function to handle the next image (right arrow)
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle the previous image (left arrow)
  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
      <div
        ref={dialogRef}
        className="w-full max-w-md bg-white h-full overflow-auto shadow-lg p-6 relative z-60 pt-20"
      >
        {/* Close Button */}
        <button
          className="absolute bg-primary top-15 right-4 w-8 text-white bg-orange-500 hover:bg-orange-600 rounded p-2 z-70 mt-2"
          onClick={onClose}
        >
          X
        </button>

        {/* Image Section with Optional Second Image */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-full max-w-xs">
            <Image
              src={images[currentImageIndex]}
              alt={project.name}
              width={500}
              height={300}
              quality={100}
              className="rounded-lg"
            />
          </div>

          {/* If there is a second image, show navigation arrows */}
          {images.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray text-white rounded px-2 shadow-lg hover:bg-gray-200"
              >
                &lt;
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray text-white rounded px-2 shadow-lg hover:bg-gray-200"
              >
                &gt;
              </button>
            </>
          )}
        </div>

        {/* Project Details */}
        <div className="px-4">
          <h2 className="text-xl font-bold mb-2">{project.name}</h2>
          {project.description && (
            <p className="text-base text-gray-700 mb-4">
              {project.description}
            </p>
          )}
          {project.stack && (
            <p className="text-md text-gray-500 mb-2">
              <strong>Stack:</strong> {project.stack}
            </p>
          )}

          {/* View Demo Button */}
          {project.url && (
            <div className="mt-6 flex justify-start">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded"
              >
                View Site
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;
