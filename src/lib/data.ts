import sql from "./db";
import { Post, User } from "./types";
import { POSTS_PER_PAGE } from "./constants";

export async function fetchPosts(page: number = 1) {
  try {
    const offset = (page - 1) * POSTS_PER_PAGE;

    const posts = await sql<Post[]>`
      SELECT *
      FROM posts
      ORDER BY created_at DESC
      LIMIT ${POSTS_PER_PAGE}
      OFFSET ${offset}
    `;

    return posts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchPostsPages() {
  try {
    const result = await sql`
      SELECT COUNT(*) FROM posts
    `;

    const totalPages = Math.ceil(Number(result[0].count) / POSTS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total pages for posts");
  }
}

export async function fetchPostById(id: string | number) {
  try {
    const posts = await sql<Post[]>`
      SELECT *
      FROM posts
      WHERE id = ${id}
      LIMIT 1
    `;

    if (posts.length === 0) {
      throw new Error("Post not found");
    }

    return posts[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post by id");
  }
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const users = await sql<User[]>`
      SELECT id, email, name, is_admin, created_at
      FROM users
      ORDER BY created_at DESC
    `;
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function fetchUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql<User[]>`
      SELECT id, email, password_hash, name, is_admin
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user by email");
  }
}
