export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactMessage {
  id: number
  name: string
  subject: string
  email: string
  message: string
  createdAt: Date
}
