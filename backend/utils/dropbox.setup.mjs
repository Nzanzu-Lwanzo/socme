import dotenv from "dotenv";
dotenv.config();
import { Dropbox } from "dropbox";
import fetch from "isomorphic-fetch";
import { extname } from "node:path";

const dpx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

export const getFilepath = (file) => {
  return `/${Date.now()}-${file.originalname}.${extname(
    file.originalname
  )}`;
};

export default dpx;
