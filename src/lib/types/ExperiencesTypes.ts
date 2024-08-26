export interface Experience {
  id: number
  company: string
  city: string
  role: string
  description: string
  tasks: string[]
  logo: string
  startDate: Date
  endDate: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Translation {
  id: number
  locale: string
  key: string
  value: string
  experienceId: number
}
