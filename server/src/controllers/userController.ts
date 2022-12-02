import { Request, Response } from "express";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");
const SECRET_KEY = "ISHWAR";

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await userModel.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: userData.email, id: userData._id },
      SECRET_KEY
    );

    res.status(201).json({ user: userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );

    res.status(201).json({ user: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { signup, signin };
