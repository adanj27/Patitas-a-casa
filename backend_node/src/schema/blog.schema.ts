import { z } from "zod";

const BlogSchemaz = z.object({
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
  image_url: z.string({
    required_error: "Image is required",
  }),
  status: z.boolean().optional().default(true),
  count_view: z.number().optional(),
});

export function ValidateBlog(input: unknown) {
  const result = BlogSchemaz.parse(input);
  return result;
}
