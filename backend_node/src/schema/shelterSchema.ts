import { z } from "zod";
import mongoose from "mongoose";
import { isValidImageURL } from "../helpers/regexFunctions";

// create
export const ShelterSchemaz = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: "Title is required!",
          invalid_type_error:
            "You need a valid title, a minimum of 10 and a maximum of 150 characters.",
        })
        .min(10)
        .max(150),
      description: z.string({ required_error: "Description is required" }),
      image_url: z
        .string({
          required_error: "Image is required",
        })
        .refine((url) => isValidImageURL(url), "this image dont valid!"),
      status: z.boolean().optional().default(true),
      count_view: z.number().optional(),
    })
    .strict(),
});

// update
export const UShelterSchema = z.object({
  body: z
    .object({
      title: z.string().min(10).max(150).optional(),
      description: z.string().optional(),
      image_url: z
        .string()
        .refine((url) => isValidImageURL(url), "this image dont valid!")
        .optional(),
      status: z.boolean().optional(),
      count_view: z.number().optional(),
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
export const DShelterSchema = z.object({
  params: z
    .object({
      id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Id invalid!",
      }),
    })
    .strict(),
});

export type ShelterCreateType = z.infer<typeof ShelterSchemaz>["body"];
export type ShelterUpdateTypeB = z.infer<typeof UShelterSchema>["body"];
export type ShelterUpdateTypeP = z.infer<typeof UShelterSchema>["params"];
export type ShelterDeleteType = z.infer<typeof DShelterSchema>["params"];
