import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateProject } from '@/lib/admin-actions'
import ProjectForm from '../../ProjectForm'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditPageProps) {
  await requireAdmin()
  const { id } = await params
  const [project, skills] = await Promise.all([
    prisma.project.findUnique({
      where: { id: Number(id) },
      include: { skills: true },
    }),
    prisma.skill.findMany({ orderBy: [{ type: 'asc' }, { name: 'asc' }] }),
  ])

  if (!project) notFound()

  const action = updateProject.bind(null, project.id)

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/projects"
          className="text-gray-400 hover:text-black text-sm"
        >
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold">Modifier : {project.name}</h1>
      </div>
      <ProjectForm action={action} skills={skills} defaultValues={project} />
    </div>
  )
}
