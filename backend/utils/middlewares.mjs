import { matchedData, validationResult } from "express-validator";

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
