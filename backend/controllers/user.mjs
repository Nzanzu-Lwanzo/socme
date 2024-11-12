import User from "../db/models/user.mjs";
import {
  manuallyValidateName,
  manuallyValidatePassword,
} from "../utils/userValidation.mjs";
import { v2 as cloudinary } from "cloudinary";
import "../utils/cloudinary.setup.mjs";

export const subscribeToPushNotifications = (req, res) => {
  const { subscription } = req.body;

  try {
    if (!subscription?.endpoint || !subscription?.keys) {
      return res.sendStatus(400);
    }

    User.findByIdAndUpdate(req.user._id, {
      $set: { pushSubscription: subscription },
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const createAccount = async (req, res) => {
  try {
    const account = await User.create(req.body);
    req.session.user = {
      _id: account._id,
      name: account.name,
      picture: account.picture,
    };
    res.status(201).json(account);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const getAccount = async (req, res) => {
  try {
    const account = await User.findById(req.user._id);
    res.json(account);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const logUserIn = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    res.sendStatus(500);
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const logUserOut = async (req, res) => {
  try {
    req.logout({ keepSessionInfo: false }, (err) => {
      if (err) {
        throw new Error("LOGIN_FAILED");
      }
    });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!manuallyValidateName(name))
      return res.status(406).json({ error: "INVALID_USERNAME" });
    if (!manuallyValidatePassword(password))
      return res.status(406).json({ error: "INVALID_PASSWORD" });

    let fileUrl;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: "image",
        });

        console.log(result);

        fileUrl = result.url;
      } catch (e) {
        console.log(e);
        fileUrl = undefined;
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...req.body,
          picture: req.file ? fileUrl : undefined,
        },
      },
      { new: true }
    );

    res.json(user);
  } catch (e) {
    console.log(e);
    if (e.name === "FetchError" && e.message.includes("dropbox")) {
      res.sendStatus(400);
      return;
    }

    res.sendStatus(500);
  }
};
