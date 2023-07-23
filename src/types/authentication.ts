import { z, ZodType } from "zod";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  firstName: string;
  lastName: string;
  profilePic: string;
  userName?: string;
  confPassword: string;
}

export const registerSchema: ZodType<RegisterData> = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50)
      .regex(/^[a-zA-Z]+$/, "First name must only contain letters"),
    lastName: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]+$/, "Last name must only contain letters"),
    email: z.string().email("Invalid email address"),
    userName: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z0-9\#\_\!\@\$\%\^\&\*]+$/)
      .optional(),
    password: z.string().min(8).max(50),
    confPassword: z.string().min(8).max(50),
    profilePic: z.string().url(),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords do not match",
    path: ["confPassword"],
  });
