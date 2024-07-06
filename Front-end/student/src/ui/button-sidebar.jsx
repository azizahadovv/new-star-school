import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function ButtonSidebar({ img, img2, slug, name }) {
  const path = window.location.pathname
  return (
    <Link to={slug} className={`flex items-center justify-start gap-3 no-underline text-white leading-8  px-2 py-2  rounded-lg ${slug === path ? "bg-moodGray border border-brGray " : ""}`}>
      <span className={`flex gap-3 text-[18px] font-semibold ${slug === path ? "text-white" : "text-iconColor"}`}> <img src={slug === path ? img : img2} width={25} height={25} alt="##" /> {name}</span>
    </Link>
  )
}

export default ButtonSidebar