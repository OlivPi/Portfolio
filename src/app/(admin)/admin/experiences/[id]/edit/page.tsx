import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateExperience } from '@/lib/admin-actions'
import ExperienceForm from '../../ExperienceForm'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditExperiencePage({ params }: EditPageProps) {
  await requireAdmin()
  const { id } = await params
  const experience = await prisma.experience.findUnique({
    where: { id: Number(id) },
  })

  if (!experience) notFound()

  const action = updateExperience.bind(null, experience.id)

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/experiences"
          className="text-gray-400 hover:text-black text-sm"
        >
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold">Modifier : {experience.company}</h1>
      </div>
      <ExperienceForm action={action} defaultValues={experience} />
    </div>
  )
}
