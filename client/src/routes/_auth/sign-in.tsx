import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_auth/sign-in')({
  component: () =><SignIn />
})

const SignIn = () => {
  return (
    <div>
      halo
    </div>
  )
}

export default SignIn
