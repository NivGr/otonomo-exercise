import React from 'react'
import cn from 'classnames'

import './Input.scss'

function Input({ className, ...props }) {
  return <input type="text" placeholder= "Please enter Vehicle Identification Number (VIN) to track"  style={{height: '40px', borderRadius:'15px'}} aria-label="Large" aria-describedby="inputGroup-sizing-sm" {...props} className={cn("col-sm-9", className)} />
}

export default Input
