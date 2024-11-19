import User from "../db/models/user.mjs";
import {
  manuallyValidateName,
  manuallyValidatePassword,
} from "../utils/userValidation.mjs";
import { v2 as cloudinary } from "cloudinary";
import "../utils/cloudinary.setup.mjs";
import { nanoid } from "nanoid";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const getAllUserSubscriptions = async (uid) => {
  try {
    const users = await User.find(
      {
        pushSubscription: { $exists: true, $ne: null },
        _id: { $ne: uid },
      },
      { pushSubscription: true }
    );

    return users;
  } catch (e) {
    return [];
  }
};

export const subscribeToPushNotifications = async (req, res) => {
  const { subscription } = req.body;

  try {
    if (!subscription?.endpoint || !subscription?.keys) {
      return res.sendStatus(400);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { pushSubscription: subscription },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const unsubscribeFromPush = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { pushSubscription: null },
      },
      { new: true }
    );

    res.status(200).json(user);
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
    const { name, password, old_picture_public_id } = req.body;

    if (!manuallyValidateName(name))
      return res.status(406).json({ error: "INVALID_USERNAME" });
    if (password && !manuallyValidatePassword(password))
      return res.status(406).json({ error: "INVALID_PASSWORD" });

    let pictureImageData;

    if (req.file) {
      // Delete the the ancient profile picture
      try {
        await cloudinary.uploader.destroy(old_picture_public_id, {
          invalidate: true,
          type: "upload",
          resource_type: "image",
        });
      } catch (e) {
        // Store this public_id value somewhere
        // where we store the ids of stale images
        // that were not deleted. We'll use these ids
        // in the future to delete them.
      }

      // Upload the new profile picture
      const public_id = nanoid();
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: public_id,
          type: "upload",
          resource_type: "image",
        });

        pictureImageData = {
          url: result.url.replace("http", "https"),
          public_id,
        };
      } catch (e) {
        console.log(e);
        pictureImageData = undefined;
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...req.body,
          picture: req.file ? pictureImageData : undefined,
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
