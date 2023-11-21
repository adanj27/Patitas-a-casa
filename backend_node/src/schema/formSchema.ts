import { z } from "zod";
import mongoose from "mongoose";
import { isValidImageURL } from "../helpers/regexFunctions";

// create
export const FormSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required!" }),
      color: z.string({
        required_error: "Color is required!",
      }),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
      city: z.string({ required_error: "City is required!" }),
      address: z.string({ required_error: "Address is required!" }),
      reward: z.number().optional(),
      contact: z.string({ required_error: "Contact is required" }),
      loss_date: z.string().datetime(),
      image_url: z
        .string({
          required_error: "Image is required",
        })
        .refine((url) => isValidImageURL(url), "this image dont valid!"),
      description: z.string({ required_error: "Description is required" }),
      status: z.boolean().optional(),
      type: z.enum(["DOG", "CAT", "OTHERS"]),
    })
    .strict(),
});

// update
export const UFormSchema = z.object({
  body: z
    .object({
      name: z.string().min(10).max(100).optional(),
      color: z.string().optional(),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
      city: z.string().optional(),
      address: z.string().optional(),
      reward: z.number().optional(),
      contact: z.string().optional(),
      loss_date: z.date().optional(),
      image_url: z
        .string()
        .refine((url) => isValidImageURL(url), "this image dont valid!")
        .optional(),
      description: z.string().optional(),
      status: z.boolean().optional(),
      type: z.enum(["DOG", "CAT", "OTHERS"]).optional(),
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
export const DFormSchema = z.object({
  params: z
    .object({
      id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Id invalid!",
      }),
    })
    .strict(),
});
