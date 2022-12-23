import { Request, Response } from "express";
import {
  validateSignup,
  validateSignin,
  validateRefreshToken,
} from "../validator";
import {
  handleUserSignin,
  handleUserSignup,
  handleRefreshToken,
} from "../services/user.service";

/**
 * Function to handle user signup
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signup = async (req: Request, res: Response) => {
  const { error } = validateSignup(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const response = await handleUserSignup(req.body);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle user signin
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signin = async (req: Request, res: Response) => {
  const { error } = validateSignin(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const response = await handleUserSignin(req.body);

  return res.status(response.status).json(response.data);
};

/**
 * Function to generate new access token from refresh token.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const refresh = (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  const { error } = validateRefreshToken(refreshToken);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const response = handleRefreshToken(refreshToken);

  return res.status(response.status).json(response.data);
};
