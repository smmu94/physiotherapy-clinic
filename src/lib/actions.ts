"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import cloudinary from "@/lib/cloudinary";
import { routes } from "./routes";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import { DEFAULT_POST_IMAGE } from "@/components/form/createPostForm/constants";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(6, "title_too_short"),
  content: z.string().min(20, "content_too_short"),
  image_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const CreatePostSchema = FormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});


export type State = {
  errors?: {
    title?: string[];
    content?: string[];
    image_url?: string[];
  };
  message?: string | null;
};
export async function createPost(prevState: State, formData: FormData) {
  let imageUrl: string = DEFAULT_POST_IMAGE;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    try {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(imageFile.type)) {
        return {
          errors: { image_url: ["image_invalid_type_error"] },
          message: "image_invalid_type_message",
        };
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        return {
          errors: { image_url: ["image_invalid_size_error"] },
          message: "image_invalid_size_message",
        };
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${imageFile.type};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUrl, {
        folder: "blog-posts",
        resource_type: "image",
        transformation: [
          { width: 1200, height: 630, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      imageUrl = uploadResult.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return {
        errors: { image_url: ["image_upload_error"] },
        message: "image_upload_message",
      };
    }
  }

  const validateFields = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    image_url: imageUrl,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors as State["errors"],
      message: "validation_error",
    };
  }

  const { title, content } = validateFields.data;
  const created_at = new Date().toISOString();

  try {
    await sql`
      INSERT INTO posts (title, content, image_url, created_at)
      VALUES (${title}, ${content}, ${imageUrl}, ${created_at})
    `;
  } catch (error) {
    console.error("Database error:", error);
    return {
      errors: {},
      message: "db_create_error",
    };
  }

  revalidatePath(routes.blog.list);
  redirect(routes.blog.list);
}

// AUTHENTICATION
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const redirectTo = formData.get("redirectTo") as string;
    
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    redirect(redirectTo || routes.blog.list);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "invalid_credentials";
        default:
          return "default";
      }
    }
    throw error;
  }
}
// LOGOUT
export async function logout(redirectTo: string) {
  await signOut({ redirectTo });
}
