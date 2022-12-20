const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

import {
  ACCESS_TOKEN_SIGNATURE_KEY,
  REFRESH_TOKEN_SIGNATURE_KEY,
} from "../constant";

let refreshTokens: string[] = [];

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

    const accessToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      ACCESS_TOKEN_SIGNATURE_KEY,
      { expiresIn: "5s" }
    );

    const refreshToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      REFRESH_TOKEN_SIGNATURE_KEY,
      { expiresIn: "7d" }
    );
    refreshTokens.push(refreshToken);

    return {
      status: 201,
      data: { user: existingUser, accessToken, refreshToken },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
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
      ACCESS_TOKEN_SIGNATURE_KEY
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

/**
 * Service for generating new access token from refresh token.
 *
 * @param refreshToken string
 * @returns {object}
 */
export const handleRefreshToken = (refreshToken: string) => {
  console.log("REFRESH", refreshToken);
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return {
      status: 403,
      data: { message: "Refresh token not found, login again" },
    };
  }

  // If the refresh token is valid, create a new accessToken and return it.
  const response = jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SIGNATURE_KEY,
    (err: string, user: { email: string; id: string }) => {
      if (!err) {
        const accessToken = jwt.sign(
          { email: user.email, id: user.id },
          ACCESS_TOKEN_SIGNATURE_KEY,
          {
            expiresIn: "20s",
          }
        );

        return {
          status: 200,
          data: { token: accessToken },
        };
      } else {
        return {
          status: 403,
          data: { message: "Invalid refresh token" },
        };
      }
    }
  );

  return response;
};
