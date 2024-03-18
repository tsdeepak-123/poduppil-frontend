import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import ProjectList from '../../../components/AdminComponents/Project/ProjectList'
import PurchaseByCareOf from "../../../components/AdminComponents/Materials/PurchaseByCareOf"
import CareOfTable from '../../../components/AdminComponents/Materials/CareOfTable'
import { ReceiptTwoTone } from '@mui/icons-material'
import RecentPurchase from '../../../components/AdminComponents/Materials/RecentPurchase'




function ProjectLists() {

  return (
    <div>
        <Header headers="PURCHASE DETAILS"/>
        <div className='mt-20'>
          <RecentPurchase/>
        </div>
        <div className='mt-20'>
          <p className='flex justify-center font-serif font-bold text-[30px]'>Total Credit Purchase</p>
          <PurchaseByCareOf/>
        </div>
        <div>
        <p className='flex justify-center font-serif font-bold text-[30px] mt-16'>Total Material Purchase Expense</p>
        <ProjectList/>
        </div>
        <div className='mt-40'>
        <Footer/>
        </div>
       
      
    </div>
  )
}

export default ProjectLists
