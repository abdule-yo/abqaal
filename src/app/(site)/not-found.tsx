import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-primary)]">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
