import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { HttpError, HttpSuccess } from "../utils/error";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} from "../apiConfig";

type payloadType = {
  username?: string;
  email: string;
  password: string;
};

type adminPayloadType = {
  userid: string;
  username: string;
  password: string;
};

/**
 * Service for handling user sign in
 *
 * @param payload payloadType
 * @returns {object}
 */
export const userSignin = async (payload: payloadType) => {
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
export const userSignup = async (payload: payloadType) => {
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

/**
 * Service for fetching user
 * @returns {object}
 */
export const getUsers = async () => {
  try {
    const users = await userModel.find();

    return HttpSuccess.OK(users);
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling delete user
 *
 * @param id string | number
 * @returns {object}
 */
export const deleteUser = async (payload: adminPayloadType) => {
  try {
    if (
      payload.username !== ADMIN_USERNAME ||
      payload.password !== ADMIN_PASSWORD
    ) {
      return HttpError.Invalid("Username or password incorrect.");
    }

    const user = await userModel.findByIdAndRemove(payload.userid);

    return HttpSuccess.Accepted(user!);
  } catch {
    return HttpError.BadRequest("Something went wrong.");
  }
};
