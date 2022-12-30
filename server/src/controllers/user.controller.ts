import { Request, Response } from "express";
import { userSignin, userSignup } from "../services/user.service";

/**
 * Function to handle user signup
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signup = async (req: Request, res: Response) => {
  const response = await userSignup(req.body);

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
  type responseType = {
    status: number;
    data: {
      refreshToken?: string;
    };
  };

  const response: responseType = await userSignin(req.body);

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 3600000),
  };

  return res
    .status(response.status)
    .cookie("refreshToken", response.data.refreshToken, options)
    .json(response.data);
};
