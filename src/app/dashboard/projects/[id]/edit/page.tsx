import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProjectForm } from '../../project-form'
import type { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()
  const project = data as Project

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Edit Project</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">{project.title}</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <ProjectForm project={project} />
      </div>
    </div>
  )
}
