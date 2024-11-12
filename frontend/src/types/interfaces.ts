export interface StateUserType {
  name: string;
  password: string;
  picture?: File | string;
}

export interface StatePostType {
  textContent: string;
  mediaFiles: File[] | string[];
}

export interface User extends StateUserType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

export type PopulateUserType = Pick<User, "_id" | "name" | "picture">;

export interface Post extends StatePostType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
  author: PopulateUserType | string;
  comments: Comment[];
  likes: string[] | PopulateUserType[];
  dislikes: string[] | PopulateUserType[];
  seen: string[] | PopulateUserType[];
}

export interface Comment {
  content: string;
  post: string;
  author: PopulateUserType;
  likes: number;
  dislikes: number;
}
