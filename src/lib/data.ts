import sql from "./db";
import { Post } from "./types";

export async function fetchPosts() {
  try {
    const posts = await sql<Post[]>`
    SELECT *
    FROM posts`;
    return posts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error ("Failed to fetch posts");
  }
}