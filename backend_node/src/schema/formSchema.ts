import { z } from "zod";
import mongoose from "mongoose";
import { isValidImageURL } from "../helpers/regexFunctions";

// create
export const formSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required!",
        invalid_type_error:
          "You need a valid title, a minimum of 10 and a maximum of 150 characters.",
      })
      .min(10)
      .max(100),
    image_url: z
      .string({
        required_error: "Image is required",
      })
      .refine((url) => isValidImageURL(url), "this image dont valid!"),
    date: z.date({
      required_error: "Date is required!",
      invalid_type_error: "That's not a date!",
    }),
    contact: z.string({ required_error: "Contact is required" }),
    zone: z.string({ required_error: "Zone is required" }),
    size: z.string({ required_error: "Size is required" }),
    type: z.enum(["dog", "cat", "others"]),
    description: z.string({ required_error: "Description is required" }),
  }),
});

// update
export const UFormSchema = z.object({
  body: z.object({
    name: z.string().min(10).max(100).optional(),
    image_url: z
      .string()
      .refine((url) => isValidImageURL(url), "this image dont valid!")
      .optional(),
    date: z.date().optional(),
    contact: z.string().optional(),
    zone: z.string().optional(),
    shelter: z
      .object({
        id: z
          .string()
          .refine((value) => mongoose.Types.ObjectId.isValid(value), {
            message: "Id invalid!",
          })
          .optional(),
        name: z.string().optional(),
      })
      .optional(),
    type: z.enum(["dog", "cat", "others"]).optional(),
    description: z.string().optional(),
  }),

  params: z.object({
    id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id invalid!",
    }),
  }),
});

// for getById - Delete
export const DFormSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id invalid!",
    }),
  }),
});
