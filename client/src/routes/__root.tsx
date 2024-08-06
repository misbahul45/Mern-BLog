import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'




export const Route =createRootRoute({
  component: RootComponent
})

function RootComponent(){
  return <>
          <Header />
          <main className='dark:bg-slate-800'>
            <Outlet />
          </main>
          <Footer />
        </>
}