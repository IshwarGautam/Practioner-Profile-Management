import { userModel } from "../models/user.model";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY: string = process.env.SECRET_KEY || "";

type payloadType = {
  username?: string;
  email: string;
  password: string;
};

export const handleUserSignin = async (payload: payloadType) => {
  const { email, password } = payload;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return {
        status: 404,
        data: { message: "User not found." },
      };
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return {
        status: 401,
        data: { message: "Invalid Credentials." },
      };
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );

    return {
      status: 201,
      data: { user: existingUser, token },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};

export const handleUserSignup = async (payload: payloadType) => {
  const { username, email, password } = payload;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return {
        status: 409,
        data: { message: "User already exists." },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: userData.email, id: userData._id },
      SECRET_KEY
    );

    return {
      status: 201,
      data: { user: userData, token },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};
