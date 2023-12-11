import { z } from "zod";
import { isValidImageURL, validateImage } from "../helpers/regexFunctions";

// create
export const BlogcreateSchema = z.object({
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
      sub_title: z.string({
        required_error: "Sub title is required",
      }),
      description: z.string({ required_error: "Description is required" }),
      short_description: z.string().optional(),
      image_url: z
        .string({
          required_error: "Image is required",
        })
        .refine((url) => validateImage(url), "this image dont valid!"),
      status: z.boolean().optional().default(true),
      count_view: z.number().optional(),
    })
    .strict(),
});

// update
export const BlogupdateSchema = z.object({
  body: z
    .object({
      title: z.string().min(10).max(150).optional(),
      sub_title: z.string().optional(),
      description: z.string().optional(),
      short_description: z.string().optional(),
      image_url: z
        .string()
        .refine((url) => isValidImageURL(url), "this image dont valid!")
        .optional(),
      status: z.boolean().optional(),
      count_view: z.number().optional(),
    })
    .strict(),
});

export type BlogCreateType = z.infer<typeof BlogcreateSchema>["body"];
export type BlogUpdateTypeB = z.infer<typeof BlogupdateSchema>["body"];
