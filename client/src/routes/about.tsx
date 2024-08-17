import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component:AboutPage
})

function AboutPage(){  
  return(
    <section className='min-h-[calc(100vh-4rem)]'></section>
  )
}