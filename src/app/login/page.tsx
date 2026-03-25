import { Metadata } from 'next'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#1A1A17] tracking-tight">
            Abqaal Admin
          </h1>
          <p className="mt-2 text-sm text-[#1A1A17]/40">
            Sign in to manage projects and products
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-[#E8E8E0]">
          <LoginForm />
        </div>

        <p className="text-center mt-6 text-xs text-[#1A1A17]/30">
          Only authorized administrators can access the dashboard.
        </p>
      </div>
    </main>
  )
}
