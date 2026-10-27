import { Experience } from '@prisma/client'

import { EXPERIENCE_TYPES } from '@/lib/experience-validation'

interface ExperienceFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Experience
}

function toDateInputValue(date: Date | null | undefined): string {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}

export default function ExperienceForm({
  action,
  defaultValues,
}: ExperienceFormProps) {
  const d = defaultValues

  return (
    <form action={action} className="bg-white p-6 shadow-sm space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Entreprise" name="company" defaultValue={d?.company} required />
        <Field label="Ville" name="city" defaultValue={d?.city} required />
      </div>

      <Field label="Intitulé du poste" name="role" defaultValue={d?.role} required />

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          name="type"
          defaultValue={d?.type ?? 'Salarié'}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
        >
          {EXPERIENCE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Date de début
          </label>
          <input
            type="date"
            name="startDate"
            defaultValue={toDateInputValue(d?.startDate)}
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Date de fin{' '}
            <span className="text-gray-400 font-normal">(vide = présent)</span>
          </label>
          <input
            type="date"
            name="endDate"
            defaultValue={toDateInputValue(d?.endDate)}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Missions{' '}
          <span className="text-gray-400 font-normal">(une par ligne)</span>
        </label>
        <textarea
          name="tasks"
          rows={6}
          defaultValue={d?.tasks.join('\n') ?? ''}
          required
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black resize-y"
        />
      </div>

      <Field
        label="Logo (nom du fichier dans /public)"
        name="logo"
        defaultValue={d?.logo}
        required
        placeholder="ex: logo-entreprise.png"
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          className="bg-black text-white text-sm px-6 py-2 hover:bg-gray-800 transition-colors"
        >
          {d ? 'Enregistrer' : 'Créer'}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
}: {
  label: string
  name: string
  defaultValue?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue ?? ''}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
      />
    </div>
  )
}
