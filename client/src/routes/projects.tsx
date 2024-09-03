import { createFileRoute } from '@tanstack/react-router'
import {LIST_PROJECTS} from '../constans/index'
export const Route = createFileRoute('/projects')({
  component: Projects
})

function Projects(){
  return(
    <section className='min-h-[calc(100vh-4rem)] w-full py-6 flex flex-col justify-center items-center'>
      <div className='font-semibold rounded-lg text-3xl text-center text-slate-100 px-4 py-2 bg-gradient-to-r from-slate-600 to-gray-800 shadow-xl shadow-slate-800/30'>My Projects</div>
      <div className='w-full grid grid-cols-auto-fill gap-4 px-4'>
        {LIST_PROJECTS.map((project)=>{
          return(
            <div key={project.name} className='p-2'>
              <div className='w-full h-full rounded-lg shadow-xl shadow-slate-800/30 overflow-hidden'>
                <img src={project.image} alt={project.name} className='w-full h-full object-cover' />
              </div>
            </div>)
        })}
      </div>
    </section>
  )
}