export interface User {
  email: string | null;
  picture: string | null;
  name: string | null;
}
export interface UserToCreate extends User {
  password: string;
}
