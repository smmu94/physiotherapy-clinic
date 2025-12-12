"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";
import { routes } from "./routes";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import { DEFAULT_POST_IMAGE } from "@/components/form/createPostForm/constants";
import bcrypt from "bcryptjs";
import { ContactSchema, CreatePostSchema, UserFormSchema } from "./schemas";
import { ContactState, CreateUserState, PostState } from "./types";
import nodemailer from "nodemailer";

export async function createPost(prevState: PostState, formData: FormData, userId: string, userName: string) {
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
      errors: validateFields.error.flatten().fieldErrors as PostState["errors"],
      message: "validation_error",
    };
  }

  const { title, content } = validateFields.data;
  const created_at = new Date().toISOString();

  try {
    await sql`
      INSERT INTO posts (title, content, image_url, created_at, author_id, author_name)
      VALUES (${title}, ${content}, ${imageUrl}, ${created_at}, ${userId}, ${userName})
    `;
  } catch (error) {
    console.error("Database error:", error);
    return {
      errors: {},
      message: "db_create_post_error",
    };
  }

  revalidatePath(routes.blog.list);
  redirect(routes.blog.list);
}

export async function createUser(
  prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  const parsed = UserFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    is_admin: formData.get("is_admin"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "validation_error",
    };
  }

  const { name, email, password, is_admin } = parsed.data;

  try {
    const password_hash = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password_hash, is_admin)
      VALUES (${name}, ${email}, ${password_hash}, ${is_admin === "true"})
    `;

    revalidatePath(routes.users);

    return { message: "user_created" };
  } catch (error) {
    console.error("DB error:", error);
    return { message: "db_create_user_error" };
  }
}

// AUTHENTICATION
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const redirectTo = formData.get("redirectTo") as string;
    const locale = formData.get("locale") as string || "es";
    
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    const finalRedirect = redirectTo || routes.blog.list;
    redirect(`/${locale}${finalRedirect}`);
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

// CONTACT

export async function sendContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = ContactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "validation_error",
    };
  }

  const { name, email, message } = parsed.data;

  try {
    await sql`
      INSERT INTO contact_messages (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, ${new Date().toISOString()})
    `;
  } catch (err) {
    console.error("DB error:", err);
    return {
      errors: {},
      message: "db_send_contact_form_error",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} (web)`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje:
        ${message}
              `,
    });
  } catch (err) {
    console.error("Email error:", err);
    return {
      errors: {},
      message: "email_error",
    };
  }

  return {
    message: "message_sent",
  };
}
