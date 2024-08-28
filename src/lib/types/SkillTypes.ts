export interface Skills {
  id: number
  name_type: object
  type: string
  name: string
  icon: string
}

export interface Translation {
  id: number
  locale: string
  key: string
  value: string
  skillId: number
}
