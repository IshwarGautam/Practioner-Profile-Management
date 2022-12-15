import {
  handleAddPractitioner,
  handleGetPractitioner,
  handleUpdatePractitioner,
  handleDeletePractitioner,
  handleGetAllPractitioners,
} from "../services/practitioner.service";
import { Request, Response } from "express";
import { validatePractitioner } from "../validator";

const addPractitioner = async (req: Request, res: Response) => {
  const { error } = validatePractitioner(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const response = await handleAddPractitioner(req.body);

  return res.status(response.status).json(response.data);
};

const updatePractitioner = async (req: Request, res: Response) => {
  const { error } = validatePractitioner(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const id = req.params.practitioner_id;

  const response = await handleUpdatePractitioner(req.body, id);

  return res.status(response.status).json(response.data);
};

const deletePractitioner = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const response = await handleDeletePractitioner(id);

  return res.status(response.status).json(response.data);
};

const getPractitioner = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const response = await handleGetPractitioner(id);

  return res.status(response.status).json(response.data);
};

const getPractitioners = async (req: Request, res: Response) => {
  const response = await handleGetAllPractitioners();

  return res.status(response.status).json(response.data);
};

module.exports = {
  addPractitioner,
  getPractitioner,
  getPractitioners,
  updatePractitioner,
  deletePractitioner,
};
