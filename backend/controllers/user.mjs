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
