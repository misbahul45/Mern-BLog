import React from 'react'
import Logo from './Logo'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa6'
import { Link } from '@tanstack/react-router'

const icons=[
    {
        icon:<FaInstagram className='w-full h-full text-orange-600 group-hover:text-pink-600' />,
        link:'https://www.instagram.com/misbahulmu756/'
    },
    {
        icon:<FaLinkedin className='w-full h-full text-blue-600 group-hover:text-blue-700' />,
        link:'https://www.linkedin.com/in/misbahul-muttaqin-b87b78255/'
    },
    {
        icon:<FaGithub className='w-full h-full text-slate-900 dark:text-slate-100 group-hover:text-slate-100' />,
        link:'https://github.com/misbahul45'
    },
    {
        icon:<FaTwitter className='w-full h-full text-blue-700 group-hover:text-blue-800' />,
        link:'https://x.com/knixxen2987551'
    }
]

const Footer = () => {
  return (
    <footer className='w-full flex flex-col gap-4 justify-center items-center py-4 bg-slate-100 dark:bg-slate-900'>
      <Logo />
      <h1 className='text-slate-900 dark:text-slate-200'>Copyright &copy; {new Date().getFullYear()} <span className='font-semibold'>Misbahul&#39;s Blogs</span>, All Rights Reserved</h1>
      <div className="flex gap-4">
        {icons.map((icon, index) => (
          <Link
            key={index}
            to={icon.link}
            className='size-10 p-1.5 rounded-full shadow-md shadow-slate-800/60 dark:shadow-slate-400/60 border border-slate-800 dark:border-slate-400 group hover:bg-slate-900 dark:hover:scale-105 transition-all duration-100'
          >
            {icon.icon}
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default Footer
