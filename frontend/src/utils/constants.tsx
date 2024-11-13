export const COLOR_SCHEMA = {
  black: "#333",
  whity: "#EEE",
  white: "#FFF",
};

export const EMOJIS = {
  laugh: <span className="emoji">&#128514;</span>,
  love: <span className="emoji">&#129505;</span>,
  cry: <span className="emoji">&#128557;</span>,
};

export const PUSH_PUBLIC_KEY =
  "BHGUVgzaxey1Y2cBnJs4I7P3Ry-0Zu4cvs_kOtOOymHc-TXZLqFiZ-9il7xySKzVZ2mmCXMcHXCnlTVqrGI6VtY";

const ENV: "prod" | "dev" = "prod";

const MAP_ENV_ORIGIN = {
  prod: document.location.origin,
  dev: "http://localhost:5000",
};

export const BASE_URL = MAP_ENV_ORIGIN[ENV] + "/api";

// This value must be the same as the limit value used in the database request.
// See "countPostsToFetch" variable in "getPosts" controller
export const postCountListAndSkip = 2;

// For form validation
export let nameMaxLength = 32;
export let nameMinLength = 6;

export let passwordMaxLength = 16;
export let passwordMinLength = 6;
