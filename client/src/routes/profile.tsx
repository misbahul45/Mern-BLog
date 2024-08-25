import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { z } from 'zod'
import Sidebar from '../components/ui/ProfileSidebar'
import ProfileContent from '../components/profile/ProfileContent'

const TabSchema=z.object({
    tab:z.string().default('profile')
})

export const Route = createFileRoute('/profile')({
  component:profilePage,
  validateSearch:({ params })=>TabSchema.parse(params || {}),
})

function profilePage(){
    const { currentUser }=useSelector((state:RootState)=>state.user)
    const { tab }=Route.useSearch()

    if(!currentUser){ 
        return <Navigate to='/sign-in' />
    }
    return (
       <section className='w-full min-h-[calc(100vh-4rem)] flex md:flex-row flex-col gap-2 pb-4'>
          <Sidebar tab={tab} authorId={currentUser.id} />
          {tab==='profile' && <ProfileContent />}
       </section>
    )
}