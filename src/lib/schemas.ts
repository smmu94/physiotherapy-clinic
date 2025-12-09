import z from "zod";

export const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(6, "title_too_short"),
  content: z.string().min(20, "content_too_short"),
  image_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CreatePostSchema = FormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UserFormSchema = z.object({
  name: z.string().min(5, "name_too_short"),
  email: z.string().email("invalid_email"),
  password: z.string().min(8, "password_too_short"),
  is_admin: z.enum(["true", "false"]),
});