import { z } from "zod";
import { isValidPassword } from "../helpers";

// create
export const AuthSchema = z.object({
  body: z
    .object({
      email: z.string().email({ message: "Insert valid Email" }),
      password: z
        .string({
          required_error: "Password is required!",
        })
        .refine(
          (pass) => isValidPassword(pass),
          "Min 8 and max 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        ),
    })
    .strict(),
});

export type AuthType = z.infer<typeof AuthSchema>["body"];
