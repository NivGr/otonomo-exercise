import cn from 'classnames'
import React from 'react'
import './Button.scss'

export default function Button({ className, ...props }) {
  return <button type="button" style={{marginTop:'-5px', marginLeft: '6%', border:'1px solid black', color: 'white'}} {...props} className={cn(className, 'btn btn-outline-dark col-sm-2')} >ADD</button>
}
