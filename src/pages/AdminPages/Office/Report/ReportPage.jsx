import React from 'react'
import Header from '../../../../components/AdminComponents/Header/Header'
import Footer from '../../../../components/AdminComponents/Footer/Footer'
import Report from '../../../../components/AdminComponents/WorkReport/Report'

function ReportPage() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
        <Header headers={"WORK REPORT"}/>
        <Report />
        <Footer/>
    </div>
  )
}

export default ReportPage