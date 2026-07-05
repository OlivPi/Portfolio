'use client'

import { deleteExperience } from '@/lib/admin-actions'

export default function DeleteButton({ id }: { id: number }) {
  const action = deleteExperience.bind(null, id)

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm('Supprimer cette expérience ?')) e.preventDefault()
      }}
    >
      <button type="submit" className="text-red-600 hover:text-red-800">
        Supprimer
      </button>
    </form>
  )
}
