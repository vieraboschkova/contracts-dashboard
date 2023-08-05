import React from 'react'
import { useParams } from 'react-router-dom'

function Treatment () {
  const { treatmentId } = useParams()
  console.log(treatmentId)
  return (
    <div>
        treatment: {treatmentId}
    </div>
  )
}

export default Treatment
