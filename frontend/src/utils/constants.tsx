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

const ENV: "prod" | "dev" = "dev";

const MAP_ENV_ORIGIN = {
  prod: "https://socme.onheroku.com",
  dev: "http://localhost:5000",
};

export const BASE_URL = MAP_ENV_ORIGIN[ENV] + "/api";
