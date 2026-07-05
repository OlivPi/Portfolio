import { createExperience } from '@/lib/admin-actions'
import Link from 'next/link'
import ExperienceForm from '../ExperienceForm'

export default function NewExperiencePage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/experiences"
          className="text-gray-400 hover:text-black text-sm"
        >
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold">Nouvelle expérience</h1>
      </div>
      <ExperienceForm action={createExperience} />
    </div>
  )
}
