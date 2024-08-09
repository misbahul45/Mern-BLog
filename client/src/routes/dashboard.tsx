import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { z } from 'zod'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import DashboardProfile from '../components/dashboard/DashboardProfile'


const TabSchema=z.object({
    tab:z.string().default('profile')
})

export const Route = createFileRoute('/dashboard')({
  component:DashboardPage,
  validateSearch:({ params })=>TabSchema.parse(params || {}),
})

function DashboardPage(){
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const { tab }=Route.useSearch()

    if(!currentUser){ 
        return <Navigate to='/sign-in' />
    }
    return (
       <section className='w-full min-h-[calc(100vh-4rem)] flex md:flex-row flex-col gap-2'>
          <DashboardSidebar tab={tab} />
          {tab==='profile' && <DashboardProfile />}
       </section>
    )
}