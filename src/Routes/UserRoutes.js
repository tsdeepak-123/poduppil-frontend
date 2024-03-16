import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Homepage from '../pages/UserPages/Homepage'
import NotFoundPage from '../pages/NotFoundPage'

function UserRoutes() {
  return (
    <div>
    <Routes>
       <Route path='/' element={<Homepage/>}/>
       <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </div>
  )
}

export default UserRoutes
