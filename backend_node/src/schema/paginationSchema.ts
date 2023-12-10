import { z } from "zod";

export const PaginationSchema = z.object({
  query: z
    .object({
      skip: z.number().optional(),
      limit: z.number().default(10).optional(),
    })
    .strict(),
});

export type PaginationType = z.infer<typeof PaginationSchema>["query"];
