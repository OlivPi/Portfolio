export const EXPERIENCE_TYPES = [
  'Développement web',
  'Événement',
  'Salarié',
  'Freelance',
] as const

const MAX_LENGTHS = { company: 150, city: 100, role: 150, logo: 100 } as const
const MAX_TASKS = 30
const MAX_TASK_LENGTH = 500
export const LOGO_REGEX = /^[\w][\w .\-]*\.(png|jpe?g|webp|svg|avif|gif)$/i

export function text(formData: FormData, field: string, max: number): string {
  const value = formData.get(field)
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Le champ « ${field} » est obligatoire.`)
  }
  if (value.trim().length > max) {
    throw new Error(`Le champ « ${field} » est trop long.`)
  }
  return value.trim()
}

function date(value: FormDataEntryValue | null, field: string): Date {
  const parsed = new Date(typeof value === 'string' ? value : '')
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Le champ « ${field} » n'est pas une date valide.`)
  }
  return parsed
}

export function parseExperienceForm(formData: FormData) {
  const type = text(formData, 'type', 50)
  if (!(EXPERIENCE_TYPES as readonly string[]).includes(type)) {
    throw new Error('Type d\'expérience invalide.')
  }

  const logo = text(formData, 'logo', MAX_LENGTHS.logo)
  if (!LOGO_REGEX.test(logo)) {
    throw new Error('Le logo doit être un nom de fichier image sans dossier.')
  }

  const tasks = text(formData, 'tasks', MAX_TASKS * MAX_TASK_LENGTH)
    .split('\n')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
  if (tasks.length === 0 || tasks.length > MAX_TASKS) {
    throw new Error(`Renseignez entre 1 et ${MAX_TASKS} missions.`)
  }
  if (tasks.some((t) => t.length > MAX_TASK_LENGTH)) {
    throw new Error('Une mission est trop longue.')
  }

  const startDate = date(formData.get('startDate'), 'startDate')
  const rawEnd = formData.get('endDate')
  const endDate = rawEnd ? date(rawEnd, 'endDate') : null
  if (endDate && endDate < startDate) {
    throw new Error('La date de fin précède la date de début.')
  }

  return {
    company: text(formData, 'company', MAX_LENGTHS.company),
    city: text(formData, 'city', MAX_LENGTHS.city),
    role: text(formData, 'role', MAX_LENGTHS.role),
    tasks,
    logo,
    startDate,
    endDate,
    type,
  }
}
