export interface Reference {
  id: number
  name: string
  company: string
  role: string
  description: string
  image: string | null
  link: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Translation {
  id: number
  locale: string
  key: string
  value: string
  referenceId: number
}
