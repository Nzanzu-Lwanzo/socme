import mongoose from "mongoose";
import { generatePassword } from "../../auth/utils/passwordHandlers.mjs";

export let nameMaxLength = 32;
export let nameMinLength = 6;

export let passwordMaxLength = 16;
export let passwordMinLength = 6;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must provide a username !"],
      maxLength: nameMaxLength,
      minLength: nameMinLength,
    },
    password: {
      type: String,
      set: function (password) {
        return generatePassword(password);
      },
    },
    picture: {
      type: String,
      default: undefined,
    },
    pushSubscription: {
      endpoint: String,
      keys: {
        p256dh: String,
        auth: String,
      },
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
