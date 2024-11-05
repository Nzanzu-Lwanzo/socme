import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must provide a username !"],
    },
    email: {
      type: String,
      required: [true, "You must provide an email !"],
    },
    picture: {
      type: String,
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
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
