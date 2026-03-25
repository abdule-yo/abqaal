import { ProjectForm } from '../project-form'

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">New Project</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">Add a new project to the portfolio</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <ProjectForm />
      </div>
    </div>
  )
}
