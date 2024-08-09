import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  context:{
    user:null
  }
 })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
    context:MyRouterContext
  }
}

const App = () => {
  
  return (
      <RouterProvider router={router} />
    )
}

export default App
