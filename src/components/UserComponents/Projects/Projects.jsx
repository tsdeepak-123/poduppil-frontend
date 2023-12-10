import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import {axiosUser} from "../../../Api/Api"

function Projects() {
  const [ProjectData, setProjectData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findProject");
      setProjectData(response?.data?.allProjectData || []);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredProjects = ProjectData.filter(project => !project.IsBlocked);
  return (
    <div id="Projects">
      <p className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80 mb-6">OUR PROJECTS</p>

      <div className="container max-w-7xl flex mx-auto mt-14">
        <div className="flex flex-wrap">
          {
           filteredProjects && filteredProjects?.map((project)=>(
            <ProjectCard name={project.name} image={project.photo} />
           ))
          }
         
        </div>
      </div>
    </div>
  );
}

export default Projects;
