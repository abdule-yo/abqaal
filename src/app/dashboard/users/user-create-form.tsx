'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const ROLES = [
  { value: 'editor', label: 'Editor', description: 'Read-only access to dashboard' },
  { value: 'admin', label: 'Admin', description: 'Can create and edit content, but cannot delete' },
  { value: 'super_admin', label: 'Super Admin', description: 'Full access including delete and user management' },
] as const

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#1A1A17] mb-1">
        {label}
      </label>
      {hint && (
        <p className="text-[11px] text-[#1A1A17]/35 mb-2">{hint}</p>
      )}
      {children}
    </div>
  )
}

export function UserCreateForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor' as 'super_admin' | 'admin' | 'editor',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create user')
        setLoading(false)
        return
      }

      setSuccess(true)
      setForm({ name: '', email: '', password: '', role: 'editor' })
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" hint="The user's display name">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
            placeholder="e.g. Mohamed Ahmed"
            className={inputClass}
          />
        </Field>
        <Field label="Email" hint="Used to sign in to the dashboard">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
            placeholder="e.g. user@abqaal.com"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Password" hint="Minimum 6 characters">
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
            minLength={6}
            placeholder="Enter a strong password"
            className={inputClass}
          />
        </Field>
        <Field label="Role" hint="Determines what this user can do">
          <select
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as typeof form.role }))}
            className={inputClass}
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Role descriptions */}
      <div className="bg-[#FAFAF5] rounded-xl p-4 border border-[#E8E8E0]">
        <p className="text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider mb-3">Role Permissions</p>
        <div className="space-y-2">
          {ROLES.map((r) => (
            <div key={r.value} className={`flex items-start gap-2 text-sm ${form.role === r.value ? 'text-[#1A1A17]' : 'text-[#1A1A17]/30'}`}>
              <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                form.role === r.value ? 'border-[#4A8B2C] bg-[#4A8B2C]' : 'border-[#E8E8E0]'
              }`}>
                {form.role === r.value && (
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </div>
              <div>
                <span className="font-semibold">{r.label}</span>
                <span className="text-[#1A1A17]/40 ml-1">— {r.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
      )}
      {success && (
        <p className="text-sm text-[#4A8B2C] bg-[#E8F5E9] px-4 py-2.5 rounded-xl">
          User created successfully! They can now sign in.
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B2C] hover:bg-[#1B5E20] disabled:opacity-60 text-white font-bold text-sm rounded-full transition-colors"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Create User
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-white border border-[#E8E8E0] text-[#1A1A17]/60 font-medium text-sm rounded-full hover:bg-[#FAFAF5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
