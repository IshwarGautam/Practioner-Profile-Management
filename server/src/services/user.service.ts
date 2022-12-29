import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { HttpError, HttpSuccess } from "../utils/error";
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} from "../apiConfig";

type payloadType = {
  username?: string;
  email: string;
  password: string;
};

/**
 * Service for handling user sign in
 *
 * @param payload payloadType
 * @returns {object}
 */
export const handleUserSignin = async (payload: payloadType) => {
  const { email, password } = payload;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return HttpError.NotFound("User not found.");
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return HttpError.Invalid("Invalid Credentials.");
    }

    const accessToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return HttpSuccess.Created({
      user: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling user sign up
 *
 * @param payload payloadType
 * @returns {object}
 */
export const handleUserSignup = async (payload: payloadType) => {
  const { username, email, password } = payload;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return HttpError.Conflict("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { email: userData.email, id: userData._id },
      ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { email: userData.email, id: userData._id },
      REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return HttpSuccess.Created({ user: userData, accessToken, refreshToken });
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};
