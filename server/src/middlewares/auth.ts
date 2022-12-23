import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY } from "../constant";
import { Request, Response, NextFunction } from "express";

const ACCESS_TOKEN: string = ACCESS_TOKEN_SECRET_KEY;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];

      jwt.verify(token, ACCESS_TOKEN, (err) => {
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
