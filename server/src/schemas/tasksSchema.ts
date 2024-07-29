import { z } from "zod";

export const createTaskFieldsSchema = z.object({
  user_id: z.number().min(1, "user_id is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateTaskFieldsSchema = z.object({
  user_id: z.number().min(1, "user_id is required"),
  description: z.string().min(1, "Description is required"),
  is_done: z
    .number()
    .refine((val) => val === 0 || val === 1, {
      message: "is_done must be either 0 or 1",
    }),
});
