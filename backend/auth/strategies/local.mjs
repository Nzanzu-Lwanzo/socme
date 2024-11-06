import passport from "passport";
import { Strategy } from "passport-local";
import User from "../../db/models/user.mjs";
import { matchPasswords } from "../utils/passwordHandlers.mjs";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    const user = await User.findById(user._id);
    if (!user) throw new Error("USER_NOT_FOUND");
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

export default passport.use(
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("USER_NOT_FOUND");

        const passwordsMatch = matchPasswords(password, user.password);

        if (!passwordsMatch) throw new Error("BAD_CREDENTIALS");

        done(null, user);
      } catch (e) {
        done(e, null);
      }
    }
  )
);
