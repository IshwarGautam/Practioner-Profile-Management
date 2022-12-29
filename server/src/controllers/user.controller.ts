import { Request, Response } from "express";
import { validateSignup, validateSignin } from "../validator";
import { handleUserSignin, handleUserSignup } from "../services/user.service";

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

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 3600000),
  };

  return res
    .status(response.status)
    .cookie("refreshToken", response.data.refreshToken, options)
    .json(response.data);
};
