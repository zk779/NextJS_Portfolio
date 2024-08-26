import { useState } from 'react';
import Image from 'next/image';
import ProjectDialog from './ProjectDialog'; // Import the slide dialog component

const AppProject = ({ project }) => {
  console.log(project);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        className="bg-white border border-light-gray rounded-lg px-4 pt-6 text-center overflow-hidden cursor-pointer"
        onClick={handleProjectClick}
      >
        <div className="mb-3">
          <h3 className="text-black text-base lg:text-xl font-semibold transition duration-300 hover:text-primary">
            {project.name}
          </h3>
          {project.stack && <p className="text-gray text-xs">{project.stack}</p>}
        </div>
        <div className="mx-auto" style={{ width: `${project.width}px`, margin: '0 auto' }}>
          <Image
            src={project.image}
            alt={project.name}
            width={parseInt(project.width, 10)}
            height={60}
            quality={10}
            placeholder="blur"
            blurDataURL={project.image}
            className="transition duration-300 transform translate-y-5 hover:translate-y-0"
          />
        </div>
      </div>

      {/* Slide Dialog */}
      {isDialogOpen && (
        <ProjectDialog project={project} onClose={handleCloseDialog} />
      )}
    </>
  );
};

export default AppProject;
