import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { HttpError, HttpSuccess } from "../utils/error";
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from "../constant";

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
      return JSON.parse(HttpError.NotFound("User not found."));
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return JSON.parse(HttpError.Invalid("Invalid Credentials."));
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

    return JSON.parse(
      HttpSuccess.Created({ user: existingUser, accessToken, refreshToken })
    );
  } catch (error) {
    return JSON.parse(HttpError.BadRequest("Something went wrong."));
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
      return JSON.parse(HttpError.Conflict("User already exists."));
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

    return JSON.parse(
      HttpSuccess.Created({ user: userData, accessToken, refreshToken })
    );
  } catch (error) {
    return JSON.parse(HttpError.BadRequest("Something went wrong."));
  }
};

/**
 * Service for generating new access token from refresh token.
 *
 * @param refreshToken string
 * @returns {object}
 */
export const handleRefreshToken = (refreshToken: string) => {
  type ResponseType = {
    err: string | null;
    user: {
      email: string;
      id: string;
    };
  };

  const response: ResponseType | any = jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET_KEY,
    (err, user) => {
      return { err, user };
    }
  );

  if (!response?.err) {
    const accessToken = jwt.sign(
      { email: response?.user.email, id: response?.user.id },
      ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );

    return JSON.parse(HttpSuccess.OK({ token: accessToken }));
  } else {
    return JSON.parse(HttpError.Forbidden("Invalid refresh token"));
  }
};
