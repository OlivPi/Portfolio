'use client'

import { deleteProject } from '@/lib/admin-actions'

export default function ProjectDeleteButton({ id }: { id: number }) {
  const action = deleteProject.bind(null, id)

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm('Supprimer ce projet ?')) e.preventDefault()
      }}
    >
      <button type="submit" className="text-red-600 hover:text-red-800">
        Supprimer
      </button>
    </form>
  )
}
