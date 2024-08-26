export interface Project {
  id: number
  type: string
  name: string
  image: string
  description: string
  link: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Translation {
  id: number
  locale: string
  key: string
  value: string
  projectId: number
}
