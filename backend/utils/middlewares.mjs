import { matchedData, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";

export const validateReqBody = (req, res, next) => {
  console.log(req.body, req.file);
  const result = validationResult(req);

  if (!result.isEmpty()) return res.status(406).json(result.array());

  req.body = matchedData(req);

  next();
};

export const validateSession = (req, res, next) => {
  if (!req.signedCookies["connect.sid"]) {
    return res.sendStatus(401);
  }
  next();
};

export const validateIdParam = async (req, res, next) => {
  let { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.sendStatus(400);
  }

  next();
};
