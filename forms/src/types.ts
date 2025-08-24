export type Gender = 'male' | 'female' | 'other'

export interface FormData {
  name: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: Gender
  acceptTnC: boolean
  country: string
  imageBase64?: string | null
}

export interface Entry extends Omit<FormData, 'confirmPassword'> {
  id: string
  source: 'uncontrolled' | 'react-hook-form'
  createdAt: number
}
