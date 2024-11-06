import { UserToAuthenticateStateType } from "../types/types";

export const validateToAuthenticateUser = (
  user: UserToAuthenticateStateType
): boolean => {
  return (
    !!user.email &&
    user.email.length !== 0 &&
    !!user.password &&
    user.password.length !== 0
  );
};
