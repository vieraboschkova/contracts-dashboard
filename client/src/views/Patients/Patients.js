import React from 'react'
import { Outlet } from 'react-router-dom'

function Patients () {
  return (
    <div>
        Patients
        <Outlet />
    </div>
  )
}

export default Patients
