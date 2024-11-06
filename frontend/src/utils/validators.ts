import { UserToAuthenticateStateType } from "../types/types";

export const validateToAuthenticateUser = (
  user: UserToAuthenticateStateType
): boolean => {
  return (
    !!user.name &&
    user.name.length !== 0 &&
    !!user.password &&
    user.password.length !== 0
  );
};
