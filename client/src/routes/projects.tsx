import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: Projects
})

function Projects(){
  return(
    <section className='min-h-[calc(100vh-4rem)] py-6'>
      <h1 className='text-center dark:text-slate-100'>No Projects</h1>
    </section>
  )
}