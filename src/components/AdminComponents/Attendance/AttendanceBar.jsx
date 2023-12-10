import React from 'react'
import { useNavigate } from 'react-router-dom';
import Buttons from '../../CommonComponents/Button/Buttons'
import Search from "../../CommonComponents/Search/Search"

function AttendanceBar({click,name,value,onChange}) {
    const navigate=useNavigate()
  return (

    <div className='flex justify-around me-7 mb-10'>

    <nav className="w-full sm:flex justify-around gap-2 sm:ml-32">

       <div className='mt-5'> 
      <Search value={value} onChange={onChange}/>
      </div>

              <div onClick={()=> navigate('/admin/labourattendance')} className="cursor-pointer flex text-[#5f655f] bg-transparent outline ml-2 rounded-md font-medium my-6 px-4 py-1 w-[auto] self-center hover:bg-[#e4ece5] hover:text-black transition duration-500">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Labour-Attendance
              </div>
              <div  onClick={()=>navigate('/admin/staffattendance')} className="cursor-pointer flex text-[#5f655f] bg-transparent outline ml-2 rounded-md font-medium my-6 px-4 py-1 w-[auto] self-center hover:bg-[#ebeeec] hover:text-black transition duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Staff-Attendance
              </div>
             <div className='mt-5'>
             <Buttons name={name} click={click} />
             </div>
            </nav>
    
          </div>
  )
}

export default AttendanceBar