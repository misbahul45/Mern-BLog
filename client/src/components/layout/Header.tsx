import React, { useEffect } from 'react'
import Logo from './Logo'
import SearchForm from './SearchForm'
import Navbar from './Navbar'
import HeaderMenu from './HeaderMenu'
import NavbarMobile from './NavbarMobile'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


const Header = () => {
    const [showNavbar,setShowNavbar]=React.useState(false)
    const { darkMode }=useSelector((state:RootState)=>state.theme)
    useEffect(()=>{
      if(darkMode){
        document.body.classList.add('dark')
      }
    },[])
  return (
    <>
        <header className='dark:bg-slate-800 w-full h-16 flex items-center justify-around sticky top-0 left-0 backdrop-blur-md z-50'>
            <Logo />
            <SearchForm />
            <Navbar />
            <HeaderMenu setShowNavbar={setShowNavbar} />
            <NavbarMobile showNavbar={showNavbar} />
        </header>
    </>
  )
}

export default Header
