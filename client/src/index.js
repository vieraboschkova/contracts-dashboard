import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import ErrorPage from './ErrorPage.js'
import Patients from './views/Patients/Patients.js'
import Patient from './views/Patient/Patient.js'
import Contracts from './views/Contracts/Contracts.js'
import Contract from './views/Contract/Contract.js'
import Treatments from './views/Treatments/Treatments.js'
import Treatment from './views/Treatment/Treatment.js'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// Simple router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'patients',
        element: <Patients />,
        children: [
          {
            path: ':patientId',
            element: <Patient />
          }
        ]
      },
      {
        path: 'contracts',
        element: <Contracts />,
        children: [
          {
            path: ':contractId',
            element: <Contract />
          }
        ]
      },
      {
        path: 'treatments',
        element: <Treatments />,
        children: [
          {
            path: ':treatmentId',
            element: <Treatment />
          }
        ]
      }
    ]
  }

])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
