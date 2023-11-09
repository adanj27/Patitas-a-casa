import { z } from "zod";
import mongoose from "mongoose";

// create
export const UserSchema = z.object({
  body: z.object({
    user_name: z.string({ required_error: "Name is required!" }),
    email: z.string().email({ message: "Ivalid email address" }),
    token: z.string({ required_error: "Token is required!" }),
    status: z.boolean().optional(),
    password: z.string({ required_error: "Password is required!" }),
    roles: z.array(z.enum(["ADMIN_ROL", "USER_ROL"])),
    pets: z.array(z.string()).optional(),
  }),
});

// update
export const UUserSchema = z.object({
  body: z.object({
    user_name: z.string().optional(),
    email: z.string().email().optional(),
    token: z.string().optional(),
    status: z.boolean().optional(),
    password: z.string().optional(),
    roles: z.array(z.enum(["ADMIN_ROL", "USER_ROL"])).optional(),
    pets: z.array(z.string()).optional(),
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
