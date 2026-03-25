import { getCurrentAdmin, canManageUsers } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UserCreateForm } from '../user-create-form'

export default async function NewUserPage() {
  const currentAdmin = await getCurrentAdmin()

  if (!currentAdmin || !canManageUsers(currentAdmin.role)) {
    redirect('/dashboard')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Add Team Member</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">Create a new admin user account</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <UserCreateForm />
      </div>
    </div>
  )
}
