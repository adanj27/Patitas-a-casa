import { z } from "zod";
import mongoose from "mongoose";
import { isValidPassword } from "../helpers";

// create
export const AuthSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Insert valid Email" }),
    password: z
      .string({
        required_error: "Password is required!",
      })
      .refine(
        (pass) => isValidPassword(pass),
        "Min 8 and max 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
  }),
});

export const AuthResetPassSchema = z.object({
  body: z.object({
    oldpassword: z
      .string({
        required_error: "Password is required!",
      })
      .refine(
        (pass) => isValidPassword(pass),
        "Min 8 and max 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    newpassword: z
      .string({
        required_error: "Password is required!",
      })
      .refine(
        (pass) => isValidPassword(pass),
        "Min 8 and max 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
  }),
  params: z.object({
    id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id invalid!",
    }),
  }),
});

export type AuthType = z.infer<typeof AuthSchema>["body"];
export type AuthResetTypeB = z.infer<typeof AuthResetPassSchema>["body"];
export type AuthResetTypeP = z.infer<typeof AuthResetPassSchema>["params"];
