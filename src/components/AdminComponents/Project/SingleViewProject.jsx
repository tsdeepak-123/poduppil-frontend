import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Buttons from '../../CommonComponents/Button/Buttons';
import SingleView from '../../AdminComponents/Materials/SingleView';
import PhotoAddModal from './PhotoAddModal';
import Swal from 'sweetalert2';
import CommonCard from "../../CommonComponents/CommonCard/CommonCard";
import { useNavigate } from "react-router-dom";
import Payments from "../../AdminComponents/Project/Payments"
import SingleByProject from '../Contract/SingleByProject';
import Loading from "../../CommonComponents/Loading/Loading";

const SingleViewProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectData, setProjectData] = useState(null);
  const [materialData, setMaterialData] = useState(null);

  const id = location?.state?.id;
  const projectname=location?.state?.projectname

  // Fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`projectById?id=${id}`);
      setProjectData(response?.data?.FindProject);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const fetchMaterialData = async () => {
    try {
      const response = await axiosAdmin.get(`PurchaseBillById?projectid=${id}`);
      setMaterialData(response?.data?.PurchaseData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };


  const handleCompletedProjects = async () => {
    try {
      const result = await Swal.fire({
        title: 'Is the project completed ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, completed!'
      });

      if (result.isConfirmed) {
        await axiosAdmin.post(`completedprojects?id=${id}`);
        Swal.fire(
          'Work completed',
          'The project is added to completed projects',
          'success'
        ).then(() => {
          navigate("/admin/projectdetails");
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  // Data displaying when mounting
  useEffect(() => {
    fetchData();
    fetchMaterialData();
  }, [id]);

  return (
    <>
      <ReturnButton />
      {
        projectData ===null?(
          <Loading/>
        ):(
        <>
          <div>
        {projectData && projectData.map((project, index) => (
          <div key={index} className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg">
            <h1 className='flex justify-center font-bold text-3xl uppercase'> {project.name}</h1>
            {
              project.photos.length > 0 ? (
                project.photos.length === 1 ? (
                  <>
                    <div className="mb-6 md:mb-0 flex justify-center mt-8">
                      <img src={project.photos[0]} alt="Project Image 1" className="w-full h-96 rounded-lg" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="mb-6 md:mb-0">
                        <img src={project.photos[0]} alt="Project Image 1" className="w-full h-96 rounded-lg" />
                      </div>
                      <div className="mb-6 md:mb-0">
                        <img src={project.photos[1]} alt="Project Image 2" className="w-full h-96 rounded-lg" />
                      </div>
                    </div>
                  </>
                )
              ) : (
                project.isCompleted === false ? <p className='text-red-500'>Please add project photos</p> : ""
              )
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <CommonCard value={project.status} label="Status" />
              <CommonCard value={project.pending} label="Pending" />
              <CommonCard value={project.upnext} label="Up-next" />
              <CommonCard value={project.supervisorname} label="Supervisor name" />
              <CommonCard value={project.notes} label="Notes" />
              {
                project.isCompleted === false ? (
                  <div className='flex justify-end gap-4 mt-4'>
                    <div>
                      <PhotoAddModal projectId={project._id} />
                      <p className='text-green-500'>You can add two photos</p>
                    </div>
                    <div>
                      <Buttons name="WORK COMPLETED" click={handleCompletedProjects} />
                      <p className='text-red-500'>If project is completed <br />click here !</p>
                    </div>
                  </div>
                ) : ("")
              }
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className='flex flex-wrap justify-center mt-14'>
        <p className=' font-serif font-bold text-[30px]'>Project Recieved Cash And Date</p>
        </div>
        <Payments projectId={id}/>
      </div>

      <div className='flex flex-wrap justify-center mt-14'>
        <p className=' font-serif font-bold text-[30px]'>Material Used For This Project</p>
      </div>
      <SingleView materialData={materialData} />

      <div className='flex flex-wrap justify-center mt-14'>
        <p className=' font-serif font-bold text-[30px]'>Contracts works of this project</p>
      </div>
      <SingleByProject projectname={projectname} /></>
        )
      }
    </>
  );
};

export default SingleViewProject;
