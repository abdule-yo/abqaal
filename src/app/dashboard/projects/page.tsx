import Link from 'next/link'
import { Plus, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { DeleteButton } from './delete-button'
import { getCurrentAdmin, canCreate, canEdit, canDelete } from '@/lib/auth'
import type { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

export default async function DashboardProjectsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const projects = (data ?? []) as Project[]
  const admin = await getCurrentAdmin()
  const role = admin?.role ?? 'editor'

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A17]">Projects</h1>
          <p className="text-sm text-[#1A1A17]/40 mt-1">
            {projects.length} projects
          </p>
        </div>
        {canCreate(role) && (
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-full transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E8E8E0] overflow-hidden">
        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8E8E0]">
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase">Title</th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase hidden sm:table-cell">Category</th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase hidden md:table-cell">Location</th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase hidden lg:table-cell">Status</th>
                  <th className="text-right px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-[#E8E8E0] last:border-0 hover:bg-[#FAFAF5] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-[#1A1A17]">{project.title}</p>
                        <p className="text-xs text-[#1A1A17]/35 mt-0.5">{project.year}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-[#1A1A17]/50">{project.category}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 text-[#1A1A17]/50">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        project.status === 'Completed' ? 'bg-[#E8F5E9] text-[#4A8B2C]' :
                        project.status === 'Ongoing' ? 'bg-[#FFF3E0] text-[#F57C00]' :
                        'bg-[#E3F2FD] text-[#1976D2]'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canEdit(role) && (
                          <Link
                            href={`/dashboard/projects/${project.id}/edit`}
                            className="px-3 py-1.5 text-xs font-medium text-[#4A8B2C] hover:bg-[#E8F5E9] rounded-lg transition-colors"
                          >
                            Edit
                          </Link>
                        )}
                        {canDelete(role) && (
                          <DeleteButton id={project.id} type="projects" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#1A1A17]/40 text-sm">No projects yet</p>
            {canCreate(role) && (
              <Link
                href="/dashboard/projects/new"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#4A8B2C] text-white text-sm font-semibold rounded-full"
              >
                <Plus className="h-4 w-4" />
                Create First Project
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
