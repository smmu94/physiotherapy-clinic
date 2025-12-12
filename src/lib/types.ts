export type Post = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  author_id: User["id"];
  author_name: User["name"];
};

export type User = {
  id: string;
  email: string;
  name: string | null;
  is_admin: boolean;
  created_at: string;
  password_hash: string;
};

export type PostState = {
  errors?: {
    title?: string[];
    content?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export type CreateUserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    is_admin?: string[];
  };
  message?: string | null;
};

export type ContactState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null; //
}
