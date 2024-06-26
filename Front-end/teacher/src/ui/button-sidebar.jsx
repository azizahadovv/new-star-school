import React from 'react'
import { Link } from 'react-router-dom'

function ButtonSidebar({ slug, name }) {
  const path = window.location.pathname
  return (
    <div className='flex items-center justify-between'>
      <label className='flex items-center justify-between w-full px-2 text-xl leading-10 '>
        <Link to={slug} className={`flex items-center justify-start gap-3 no-underline text-gray hover:text-white ${path === slug ? "text-red-500" : ""}`}>
          <i className='fa fa-user'/>
          {name}
        </Link>
        <i className='fa fa-angle-left' />
      </label>

    </div>
  )
}

export default ButtonSidebar