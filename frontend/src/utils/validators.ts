import { StateUserType } from "../types/types";

export const validateToAuthenticateUser = (user: StateUserType): boolean => {
  return (
    !!user.name &&
    user.name.length !== 0 &&
    !!user.password &&
    user.password.length !== 0
  );
};
