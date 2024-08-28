export interface PersonalInformation {
    id: number
    name: string
    title: string
    location: string
    phone: string
    email: string
    age: string
    drivingLicense: string
    languages: Record<string, string>
    createdAt: Date
    updatedAt: Date
}