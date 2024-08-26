import { createRootRouteWithContext, Outlet, useLocation } from '@tanstack/react-router'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useEffect } from 'react'



export const Route =createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent
})

function RootComponent(){
  const pathName=useLocation().pathname
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  },[pathName])
  return <>
          <Header />
          <main className='bg-gradient-to-r from-white/40 via-slate-500/10 to-white/40 dark:from-slate-800/95 dark:via-slate-800/90 dark:to-slate-800/95 animate-background'>
            <Outlet />
          </main>
          <Footer />
        </>
}