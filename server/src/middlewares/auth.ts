import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

const SECRET_KEY = "ISHWAR";

const auth = (req: any, res: Response, next: any) => {
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
