import { hashSync, compareSync } from "bcrypt";

export const generatePassword = (plainText) => {
  return hashSync(plainText, 10);
};

export const matchPasswords = (plainText, hashedPassword) => {
  return compareSync(plainText, hashedPassword);
};
