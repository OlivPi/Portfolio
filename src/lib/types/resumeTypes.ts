export type ResumeData = {
  personalInformation: {
    id: number
    name: string
    title: string
    location: string
    phone: string
    email: string
    age: number
    drivingLicense: string
    languages: Record<string, string>
  }
  summary: string
  skills: Record<string, Array<{ id: number; name: string; icon: string }>>
  experiences: Array<{
    id?: number
    role: string
    company: string
    city: string
    dates: string
    description?: string
    logo: string
    tasks: string[]
    startDate: string
    endDate: string
  }>
  education: Array<{
    id: number
    degree: string
    institution: string
    dates: string
    details?: string
  }>
  interests: Array<{
    id: number
    type: string
    description: string
    icon: string
  }>
  references: Array<{
    id: number
    name: string
    company: string
    role: string
    description: string
    image?: string
    link?: string
  }>
}