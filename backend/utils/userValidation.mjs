import {
  nameMaxLength,
  nameMinLength,
  passwordMaxLength,
  passwordMinLength,
} from "../db/models/user.mjs";

/**@type {import("express-validator").Schema} */
export const credentialsValidator = {
  name: {
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: nameMinLength,
        max: nameMaxLength,
      },
      errorMessage: `Name must be ${nameMaxLength} max and ${nameMinLength} min characters length`,
    },
  },
  password: {
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: passwordMinLength,
        max: passwordMaxLength,
      },
      errorMessage: `Password must be ${passwordMaxLength} max and ${passwordMinLength} min characters length`,
    },
  },
  picture: {
    optional: true,
  },
};

export const manuallyValidateName = (name) => {
  return (
    typeof name === "string" &&
    name.trim().length !== 0 &&
    name.trim().length <= nameMaxLength &&
    name.trim().length >= nameMinLength
  );
};

export const manuallyValidatePassword = (password) => {
  return (
    typeof password === "string" &&
    password.trim().length !== 0 &&
    password.trim().length <= passwordMaxLength &&
    password.trim().length >= passwordMinLength
  );
};
