import mongoose from "mongoose";
import { z } from "zod";

export const validateIdSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id invalid!",
    }),
  }),
});

export type ValidateIdType = z.infer<typeof validateIdSchema>["params"];
