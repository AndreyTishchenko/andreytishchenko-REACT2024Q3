import { z } from 'zod'
import { isStrong } from './password'

export const schema = z.object({
  name: z.string().min(1, 'Name is required').regex(/^[A-Z][a-zA-Z\s'-]*$/, 'Must start with uppercase letter'),
  age: z.coerce.number().min(0, 'Age must be 0 or greater'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters').refine(isStrong, 'Must include number, uppercase, lowercase, special character'),
  confirmPassword: z.string().min(8, 'Confirm your password'),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Select a gender' }),

  // ⬇️ Was: z.literal(true)
  acceptTnC: z.boolean().refine((v) => v === true, {
    message: 'You must accept T&C',
  }),

  country: z.string().min(2, 'Select a country'),
  imageBase64: z.string().optional().nullable()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})

export type SchemaType = z.infer<typeof schema>