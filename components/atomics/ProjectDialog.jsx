import Image from 'next/image';
import { useEffect, useRef } from 'react';

const ProjectDialog = ({ project, onClose }) => {
  const dialogRef = useRef(null);

  // Close the dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50"> {/* Higher z-index */}
      <div
        ref={dialogRef}
        className="w-full max-w-md bg-white h-full overflow-auto shadow-lg p-6 relative z-60 pt-20 "
      >
        {/* Close Button */}
        <button
          className="absolute bg-primary top-15 right-4 w-8 text-white bg-orange-500 hover:bg-orange-600 rounded p-2 z-70 mt-2"
          onClick={onClose}
        >
          X
        </button>

        {/* Laptop Mockup with Project Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xs">
            <Image
              src={project.image}
              alt={project.name}
              width={500}
              height={300}
              quality={100}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="px-4">
          <h2 className="text-xl font-bold mb-2">{project.name}</h2>
          {project.description && (
            <p className="text-base text-gray-700 mb-4">{project.description}</p>
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
                View Demo
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;
