import { Project, Skill } from '@prisma/client'
import { PROJECT_TYPES } from '@/lib/project-validation'

type ProjectWithSkills = Project & { skills: Skill[] }

interface ProjectFormProps {
  action: (formData: FormData) => Promise<void>
  skills: Skill[]
  defaultValues?: ProjectWithSkills
}

export default function ProjectForm({
  action,
  skills,
  defaultValues,
}: ProjectFormProps) {
  const d = defaultValues
  const selected = new Set(d?.skills.map((s) => s.id))
  const skillsByType = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    ;(acc[skill.type] ??= []).push(skill)
    return acc
  }, {})

  return (
    <form action={action} className="bg-white p-6 shadow-sm space-y-5">
      <Field label="Nom du projet" name="name" defaultValue={d?.name} required />

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          name="type"
          defaultValue={d?.type ?? PROJECT_TYPES[0]}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
        >
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <Field
        label="Structure (client ou organisateur)"
        name="structure"
        defaultValue={d?.structure}
        required
      />

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          rows={4}
          maxLength={500}
          defaultValue={d?.description ?? ''}
          required
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black resize-y"
        />
      </div>

      <Field
        label="Lien"
        name="link"
        type="url"
        defaultValue={d?.link ?? ''}
        required
        placeholder="https://..."
      />

      <Field
        label="Image (nom du fichier dans /public/projects)"
        name="image"
        defaultValue={d?.image}
        required
        placeholder="ex: mon-projet-image.png"
      />

      <fieldset>
        <legend className="block text-sm font-medium mb-2">Compétences</legend>
        <div className="space-y-3">
          {Object.entries(skillsByType).map(([type, list]) => (
            <div key={type}>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                {type}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {list.map((skill) => (
                  <label key={skill.id} className="flex items-center gap-1.5 text-sm">
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill.id}
                      defaultChecked={selected.has(skill.id)}
                    />
                    {skill.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

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
  type = 'text',
}: {
  label: string
  name: string
  defaultValue?: string
  required?: boolean
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ''}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
      />
    </div>
  )
}
