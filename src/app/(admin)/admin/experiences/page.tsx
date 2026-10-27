import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export default async function ExperiencesPage() {
  await requireAdmin()
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: 'desc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Expériences</h1>
        <Link
          href="/admin/experiences/new"
          className="bg-black text-white text-sm px-4 py-2 hover:bg-gray-800 transition-colors"
        >
          + Ajouter
        </Link>
      </div>

      <div className="bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Entreprise</th>
              <th className="text-left px-4 py-3 font-medium">Poste</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-left px-4 py-3 font-medium">Dates</th>
              <th className="text-left px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{exp.company}</td>
                <td className="px-4 py-3 text-gray-600">{exp.role}</td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-gray-100 px-2 py-0.5 text-xs">
                    {exp.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {exp.startDate.getFullYear()} —{' '}
                  {exp.endDate ? exp.endDate.getFullYear() : 'présent'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/experiences/${exp.id}/edit`}
                      className="text-black underline hover:no-underline"
                    >
                      Modifier
                    </Link>
                    <DeleteButton id={exp.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {experiences.length === 0 && (
          <p className="text-center text-gray-400 py-12 text-sm">
            Aucune expérience. Ajoutez-en une !
          </p>
        )}
      </div>
    </div>
  )
}
