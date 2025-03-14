import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .regex(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: z.preprocess((val) => Number(val), z.number().min(0, 'Age must be non-negative')),
    email: z.string().nonempty('Email is required').email('Invalid email'),
    password: z
      .string()
      .nonempty('Password is required')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
        'Password must include 1 uppercase, 1 lowercase, 1 number, and 1 special character'
      ),
    confirmPassword: z.string().nonempty('Confirm your password'),
    gender: z.string().nonempty('Gender is required'),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    picture: z
      .any()
      .refine((value) => {
        // Accept if no file is provided
        if (!value || (Array.isArray(value) && value.length === 0)) return true;
        const file = Array.isArray(value) ? value[0] : value;
        const validTypes = ['image/jpeg', 'image/png'];
        return file.size <= 1024 * 1024 && validTypes.includes(file.type);
      }, { message: 'Invalid file: must be JPEG or PNG and under 1MB' })
      .optional(),
    country: z.string().nonempty('Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormSchemaType = z.infer<typeof formSchema>;
