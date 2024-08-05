import React from 'react'
import Logo from './Logo'
import SearchForm from './SearchForm'
import Navbar from './Navbar'
import HeaderMenu from './HeaderMenu'
import NavbarMobile from './NavbarMobile'


const Header = () => {
    const [showNavbar,setShowNavbar]=React.useState(false)
  return (
    <>
        <header className='dark:bg-slate-800 w-full h-16 flex items-center justify-around sticky top-0 left-0'>
            <Logo />
            <SearchForm />
            <Navbar />
            <HeaderMenu setShowNavbar={setShowNavbar} />
        </header>
        <NavbarMobile showNavbar={showNavbar} />
    </>
  )
}

export default Header
