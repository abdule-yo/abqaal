'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[var(--color-primary-dark)]">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">An unexpected error occurred. Please try again.</p>
        <Button
          onClick={reset}
          className="mt-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
        >
          Try Again
        </Button>
      </div>
    </main>
  )
}
