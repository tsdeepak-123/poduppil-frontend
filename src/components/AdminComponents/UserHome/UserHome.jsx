import React from "react";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import AddBannerModal from "./AddModals/AddBannerModal";
import AddServiceModal from "./AddModals/AddServiceModal";
import AddInterior from "./AddModals/AddInterior";
import AddProjectsModal from "./AddModals/AddProjectsModal";
import Projects from "./Tables/Projects";
import Interior from "./Tables/Interior";
import Services from "./Tables/Servces";
import Banner from "./Tables/Banner";
import AddOwnerPhoto from "./AddModals/AddOwnerPhoto";
import Owner from "./Tables/Owner";

function UserHome() {
  return (
    <>
      <ReturnButton />
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          <AddBannerModal />
          <AddServiceModal />
          <AddInterior />
          <AddProjectsModal />
          <AddOwnerPhoto />
        </div>
          <div className="flex flex-col items-center mt-14">
            <p className="uppercase font-serif text-lg">Banner Management</p>
            <Banner />
          </div>
          <div className="flex flex-col items-center mt-14">
            <p className="uppercase font-serif text-lg">Project Management</p>
            <Projects />
          </div>
          <div className="flex flex-col items-center mt-14">
            <p className="uppercase font-serif text-lg">Service Management</p>
            <Services />
          </div>
          <div className="flex flex-col items-center mt-14">
            <p className="uppercase font-serif text-lg">Interior Management</p>
            <Interior />
          </div>
          <div className="flex flex-col items-center mt-14">
            <p className="uppercase font-serif text-lg">Owner Management</p>
            <Owner />
          </div>
        </div>
    </>
  );
}

export default UserHome;
