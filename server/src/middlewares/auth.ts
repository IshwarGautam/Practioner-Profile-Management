import { Request, Response, NextFunction } from "express";
import { ACCESS_TOKEN_SIGNATURE_KEY } from "../constant";

const jwt = require("jsonwebtoken");

const ACCESS_TOKEN: string = ACCESS_TOKEN_SIGNATURE_KEY || "";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];

      jwt.verify(token, ACCESS_TOKEN, (err: { message: string }) => {
        if (!err) {
          next();
        } else if (err.message === "jwt expired") {
          return res.status(401).json({ message: "Access Token expired." });
        }
      });
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
