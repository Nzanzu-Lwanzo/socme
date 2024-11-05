import { UserToAuthenticate } from "../types/types";

export const validateToAuthenticateUser = (
  user: UserToAuthenticate
): boolean => {
  return (
    !!user.email &&
    user.email.length !== 0 &&
    !!user.password &&
    user.password.length !== 0
  );
};
