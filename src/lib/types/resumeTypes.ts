export type ResumeData = {
  personalInformation: {
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
  skills: Record<string, string[]>
  experiences: Array<{
    title: string
    company: string
    location: string
    dates: string
    tasks: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    dates: string
    details?: string
  }>
  interests: string[]
}
