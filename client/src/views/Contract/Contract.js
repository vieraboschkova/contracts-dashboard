import React from 'react'
import { useParams } from 'react-router-dom'

function Contract () {
  const { contractId } = useParams()
  console.log(contractId)
  return (
    <div>
        Contract: {contractId}
    </div>
  )
}

export default Contract
