import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Homepage from '../pages/UserPages/Homepage'

function UserRoutes() {
  return (
    <div>
    <Routes>
       <Route path='/' element={<Homepage/>}/>
    </Routes>
    </div>
  )
}

export default UserRoutes
