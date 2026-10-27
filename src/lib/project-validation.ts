import { LOGO_REGEX, text } from '@/lib/experience-validation'

export const PROJECT_TYPES = ['Développement web', 'Événement'] as const

const MAX_LENGTHS = {
  name: 100,
  structure: 150,
  description: 500,
  image: 100,
  link: 500,
} as const

export function parseProjectForm(formData: FormData) {
  const type = text(formData, 'type', 50)
  if (!(PROJECT_TYPES as readonly string[]).includes(type)) {
    throw new Error('Type de projet invalide.')
  }

  const image = text(formData, 'image', MAX_LENGTHS.image)
  if (!LOGO_REGEX.test(image)) {
    throw new Error("L'image doit être un nom de fichier sans dossier.")
  }

  const link = text(formData, 'link', MAX_LENGTHS.link)
  let url: URL
  try {
    url = new URL(link)
  } catch {
    throw new Error("Le lien n'est pas une URL valide.")
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('Le lien doit commencer par http:// ou https://.')
  }

  const skillIds = formData
    .getAll('skills')
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n > 0)

  return {
    type,
    name: text(formData, 'name', MAX_LENGTHS.name),
    structure: text(formData, 'structure', MAX_LENGTHS.structure),
    description: text(formData, 'description', MAX_LENGTHS.description),
    image,
    link: url.toString(),
    skillIds,
  }
}
