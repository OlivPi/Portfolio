import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import Link from 'next/link'
import ProjectDeleteButton from './ProjectDeleteButton'

export default async function ProjectsPage() {
  await requireAdmin()
  const projects = await prisma.project.findMany({
    orderBy: [{ type: 'asc' }, { id: 'asc' }],
    include: { skills: true },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projets</h1>
        <Link
          href="/admin/projects/new"
          className="bg-black text-white text-sm px-4 py-2 hover:bg-gray-800 transition-colors"
        >
          + Ajouter
        </Link>
      </div>

      <div className="bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Nom</th>
              <th className="text-left px-4 py-3 font-medium">Structure</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-left px-4 py-3 font-medium">Compétences</th>
              <th className="text-left px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{project.name}</td>
                <td className="px-4 py-3 text-gray-600">{project.structure}</td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-gray-100 px-2 py-0.5 text-xs">
                    {project.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {project.skills.length}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-black underline hover:no-underline"
                    >
                      Modifier
                    </Link>
                    <ProjectDeleteButton id={project.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <p className="text-center text-gray-400 py-12 text-sm">
            Aucun projet. Ajoutez-en un !
          </p>
        )}
      </div>
    </div>
  )
}
