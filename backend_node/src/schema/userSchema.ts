import { z } from "zod";
import mongoose from "mongoose";

// create
export const UserSchema = z.object({
  body: z.object({
    user_name: z
      .string({
        required_error: "Name is required!",
        invalid_type_error:
          "You need a valid user_name, a minimum of 10 and a maximum of 20 characters.",
      })
      .min(5)
      .max(20),
    email: z.string().email({ message: "Ivalid email address" }),
    token: z.string({ required_error: "Token is required!" }),
    status: z.boolean().optional(),
    password: z
      .string({
        required_error: "Password is required!",
        invalid_type_error:
          "You need a valid user_name, a minimum of 6 20 characters.",
      })
      .min(6),
    roles: z.array(z.enum(["ADMIN_ROL", "USER_ROL"])),
    forms: z.array(z.string()).optional(),
  }),
});

// update
export const UUserSchema = z.object({
  body: z.object({
    user_name: z.string().min(5).max(20).optional(),
    email: z.string().email().optional(),
    token: z.string().optional(),
    status: z.boolean().optional(),
    password: z.string().min(6).optional(),
    roles: z.array(z.enum(["ADMIN_ROL", "USER_ROL"])).optional(),
    forms: z.array(z.string()).optional(),
  }),

  params: z.object({
    id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id invalid!",
    }),
  }),
});

// for getById - Delete
export const DUserSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id invalid!",
    }),
  }),
});
