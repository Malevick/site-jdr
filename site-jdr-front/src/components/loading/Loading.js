import React from 'react'
import './Loading.css';
import { RiCheckboxBlankCircleLine, RiLoader5Line } from 'react-icons/ri'

function Loading() {
  return (
    <section className='loading'>
      <div>
        <RiCheckboxBlankCircleLine  className='wait-background'/>
        <RiLoader5Line className='wait'/>
      </div>
    </section>
  )
}

export default Loading
