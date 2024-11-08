import * as yup from "yup";
import {
  nameMaxLength,
  nameMinLength,
  passwordMaxLength,
  passwordMinLength,
} from "./constants";
import { validateImageSize } from "./medias";

const authUserShape = {
  name: yup
    .string()
    .required("You must provide a username !")
    .max(
      nameMaxLength,
      `The username must be ${nameMaxLength} characters max length, blank spaces included !`
    )
    .min(
      nameMinLength,
      `The username must be ${nameMinLength} characters min length, blank spaces included !`
    ),
  password: yup
    .string()
    .required("Vous devez fournir un mot de passe !")
    .max(
      passwordMaxLength,
      `The password must be ${passwordMaxLength} characters max length, no blank spaces !`
    )
    .min(
      passwordMinLength,
      `The password must be ${passwordMinLength} characters min length, no blank spaces !`
    )
    .matches(/^\S*$/i, {
      message: "You can't have blank spaces in your password, strip em out !",
    }),
};

export const authUserSchema = yup.object().shape(authUserShape);
export const userProfileSchema = yup.object().shape({
  ...authUserShape,
  picture: yup
    .mixed()
    .nullable()
    .test(
      "MUST_BE_IMAGE",
      "You must provide an image that's 1Mo max size !",
      (value) => {
        return value instanceof File && validateImageSize(value);
      }
    ),
});
