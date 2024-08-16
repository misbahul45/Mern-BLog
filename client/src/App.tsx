import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from 'react-query'

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

export const queryClient = new QueryClient()
const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )
}

export default App
