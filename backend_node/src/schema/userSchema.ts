import { z } from "zod";
import mongoose from "mongoose";
import { isValidPassword, isValidPhone } from "../helpers";

// create
export const createUserSchema = z.object({
  body: z
    .object({
      first_name: z
        .string({
          required_error: "Name is required!",
          invalid_type_error:
            "You need a valid name, a minimum of 5 and a maximum of 20 characters.",
        })
        .min(5)
        .max(20),
      last_name: z
        .string({
          required_error: "Second Name is required!",
          invalid_type_error:
            "You need a valid second name, a minimum of 5 and a maximum of 20 characters.",
        })
        .min(5)
        .max(20),
      alias: z
        .string({
          required_error: "Alias Name is required!",
          invalid_type_error:
            "You need a valid second name, a minimum of 5 and a maximum of 20 characters.",
        })
        .min(5)
        .max(20),
      email: z.string().email({ message: "Insert valid Email" }),
      phone: z
        .string()
        .refine((phone) => isValidPhone(phone), "Insert phone valid!"),
      status: z.boolean().optional(),
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

// update
export const UUserSchema = z.object({
  body: z
    .object({
      first_name: z.string().min(5).max(20).optional(),
      last_name: z.string().min(5).max(20).optional(),
      alias: z.string().min(5).max(20).optional(),
      email: z.string().email().optional(),
      phone: z
        .string()
        .refine((phone) => isValidPhone(phone), "Insert phone valid!")
        .optional(),
      status: z.boolean().optional(),
      // roles: z.string().optional(),
      // password: z
      //   .string({
      //     required_error: "Password is required!",
      //   })
      //   .refine(
      //     (pass) => isValidPassword(pass),
      //     "Min 8 and max 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      //   )
      //   .optional(),
    })
    .strict(),

  params: z
    .object({
      id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Id invalid!",
      }),
    })
    .strict(),
});

// for getById - Delete
export const DUserSchema = z.object({
  params: z
    .object({
      id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Id invalid!",
      }),
    })
    .strict(),
});

export type CreateUserType = z.infer<typeof createUserSchema>["body"];
