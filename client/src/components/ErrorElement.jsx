import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
    const errors=useRouteError();
  return (
    <h4>
      There was an error...
    </h4>
  )
}

export default ErrorElement
