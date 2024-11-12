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


/*

  if (req.file) {
      // Save in the dropbox folder - Cloud
      const fileUploaded = await dpx.filesUpload({
        path: getFilepath(req.file),
        contents: req.file.buffer,
      });

      if (fileUploaded.status >= 400) {
        throw new Error("IMAGE_FILE_NO_UPLOADED");
      }

      const sharedLink = await dpx.sharingCreateSharedLinkWithSettings({
        path: fileUploaded.result.path_display,
      });

      // This is the URL that allows me to access
      // the image over the network.
      // So, it's the one I'll store in the database
      // along with my user profile
      fileUrl = sharedLink.result.url.replace("?dl=0", "?raw=1");
  }

*/