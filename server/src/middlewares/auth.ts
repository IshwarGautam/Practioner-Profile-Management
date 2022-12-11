import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

const SECRET_KEY: string = process.env.SECRET_KEY || "";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];

      jwt.verify(token, SECRET_KEY);
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
