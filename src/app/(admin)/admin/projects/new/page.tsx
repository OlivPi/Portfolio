import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { createProject } from '@/lib/admin-actions'
import Link from 'next/link'
import ProjectForm from '../ProjectForm'

export default async function NewProjectPage() {
  await requireAdmin()
  const skills = await prisma.skill.findMany({
    orderBy: [{ type: 'asc' }, { name: 'asc' }],
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/projects"
          className="text-gray-400 hover:text-black text-sm"
        >
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold">Nouveau projet</h1>
      </div>
      <ProjectForm action={createProject} skills={skills} />
    </div>
  )
}
