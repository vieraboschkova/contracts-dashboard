import React from 'react'
import { useParams } from 'react-router-dom'

function Patient () {
  const { patientId } = useParams()
  console.log(patientId)
  return (
    <div>
        Patient: {patientId}
    </div>
  )
}

export default Patient
