// src/schemas/formSchema.ts
import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const formSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required")
      .refine((val) => /^[A-Z]/.test(val), {
        message: "Name must start with an uppercase letter",
      }),
    age: z.preprocess(
      (a) => Number(a),
      z.number({ invalid_type_error: "Age must be a number" }).nonnegative("Age must be a non-negative number")
    ),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((val) => passwordRegex.test(val), {
        message:
          "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character",
      }),
    confirmPassword: z.string(),
    gender: z.enum(["Male", "Female", "Other"], { invalid_type_error: "Select a gender" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept terms and conditions" }),
    }),
    // We expect picture as a base64 string after processing
    picture: z.string().nonempty("Picture is required"),
    country: z.string().min(1, "Country is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});