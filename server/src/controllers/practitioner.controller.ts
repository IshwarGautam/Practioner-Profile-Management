import {
  handleAddPractitioner,
  handleGetPractitioner,
  handleUpdatePractitioner,
  handleDeletePractitioner,
  handleGetAllPractitioners,
} from "../services/practitioner.service";
import { Request, Response } from "express";
import { validatePractitioner } from "../validator";

/**
 * Function to handle add practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const addPractitioner = async (req: Request, res: Response) => {
  const { error } = validatePractitioner(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const response = await handleAddPractitioner(req.body);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle update practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const updatePractitioner = async (req: Request, res: Response) => {
  const { error } = validatePractitioner(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const id = req.params.practitioner_id;

  const response = await handleUpdatePractitioner(req.body, id);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle delete practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const deletePractitioner = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const response = await handleDeletePractitioner(id);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle get practitioner
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const getPractitioner = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const response = await handleGetPractitioner(id);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle get all practitioners
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const getPractitioners = async (req: Request, res: Response) => {
  const response = await handleGetAllPractitioners();

  return res.status(response.status).json(response.data);
};
