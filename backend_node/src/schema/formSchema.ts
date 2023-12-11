import { z } from "zod";
import { validateImage } from "../helpers/regexFunctions";
import { PETSEARCH_TYPE, PETSIZE_TYPE, PET_TYPE } from "../interface";

// create lost
export const FormLostPetSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required!" }),
      color: z.string({
        required_error: "Color is required!",
      }),
      size: z.enum([
        PETSIZE_TYPE.SMALL,
        PETSIZE_TYPE.MEDIUM,
        PETSIZE_TYPE.LARGE,
      ]),
      city: z.string({ required_error: "City is required!" }),
      address: z.string({ required_error: "Address is required!" }),
      reward: z.number().optional(),
      contact: z.string({ required_error: "Contact is required" }),
      loss_date: z.string().datetime(),
      image_url: z
        .string({
          required_error: "Image is required",
        })
        .refine((url) => validateImage(url), "this image dont valid!"),
      description: z.string({ required_error: "Description is required" }),
      status: z.boolean().optional(),
      type: z.enum([PET_TYPE.CAT, PET_TYPE.DOG]),
      type_search: z.enum([PETSEARCH_TYPE.LOST]),
    })
    .strict(),
});

// create found
export const FormFoundPetSchema = z.object({
  body: z
    .object({
      color: z.string({
        required_error: "Color is required!",
      }),
      size: z.enum([
        PETSIZE_TYPE.SMALL,
        PETSIZE_TYPE.MEDIUM,
        PETSIZE_TYPE.LARGE,
      ]),
      city: z.string({ required_error: "City is required!" }),
      address: z.string({ required_error: "Address is required!" }),
      reward: z.number().optional(),
      contact: z.string({ required_error: "Contact is required" }),
      loss_date: z.string().datetime(),
      image_url: z
        .string({
          required_error: "Image is required",
        })
        .refine((url) => validateImage(url), "this image dont valid!"),
      description: z.string({ required_error: "Description is required" }),
      status: z.boolean().optional(),
      type: z.enum([PET_TYPE.CAT, PET_TYPE.DOG]),
      type_search: z.enum([PETSEARCH_TYPE.FOUND]),
    })
    .strict(),
});

// update
export const FormUpdateSchema = z.object({
  body: z
    .object({
      name: z.string().min(10).max(100).optional(),
      color: z.string().optional(),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
      city: z.string().optional(),
      address: z.string().optional(),
      reward: z.number().optional(),
      contact: z.string().optional(),
      loss_date: z.string().datetime(),
      image_url: z
        .string()
        .refine((url) => validateImage(url), "this image dont valid!")
        .optional(),
      description: z.string().optional(),
      status: z.boolean().optional(),
      type: z.enum(["DOG", "CAT", "OTHERS"]).optional(),
    })
    .strict(),
});

export type FormCreateLostType = z.infer<typeof FormLostPetSchema>["body"];
export type FormCreateFoundType = z.infer<typeof FormFoundPetSchema>["body"];
export type FormUpdateType = z.infer<typeof FormUpdateSchema>["body"];
