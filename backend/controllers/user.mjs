import User from "../db/models/user.mjs";

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
  console.log(req.body);
  try {
    const account = await User.create(req.body);
    res.status(201).json(account);
  } catch (e) {
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
    console.log(req.session);
    res.sendStatus(200).json({});
  } catch (e) {
    res.sendStatus(500);
  }
};
