import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import ProjectList from '../../../components/AdminComponents/Project/ProjectList'
import PurchaseByCareOf from "../../../components/AdminComponents/Materials/PurchaseByCareOf"




function ProjectLists() {

  return (
    <div>
        <Header headers="MATERIAL DETAILS"/>
        <ProjectList/>
        <div className='mt-20'>
          <p className='flex justify-center font-serif font-bold text-[30px]'>Total Purchase</p>
          <PurchaseByCareOf/>
        </div>
        <div className='mt-40'>
        <Footer/>
        </div>
       
      
    </div>
  )
}

export default ProjectLists
