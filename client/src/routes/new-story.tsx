import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-story')({
  component: () => <div>Hello /new-story!</div>
})