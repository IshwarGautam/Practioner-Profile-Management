import {
  handleRefreshToken,
  handleRemoveToken,
} from "../services/token.service";
import { Request, Response } from "express";

/**
 * Function to generate new access token from refresh token.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const response = handleRefreshToken(refreshToken);

  return res.status(response.status).json(response.data);
};

/**
 * Function to remove refresh token from cookies.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const remove = (req: Request, res: Response) => {
  const response = handleRemoveToken(res);

  return res.status(response.status).json(response.data);
};
