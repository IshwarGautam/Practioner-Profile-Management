import { Request, Response } from "express";

const { validatePractitioner } = require("../validator");

const practitionerModel = require("../models/practitioner");

const addPractitioner = async (req: Request, res: Response) => {
  const { error } = validatePractitioner(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const {
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    assetUrl,
  } = req.body;

  const newPractitioner = new practitionerModel({
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    assetUrl,
  });

  try {
    const existingPractitioner = await practitionerModel.findOne({ email });

    if (existingPractitioner) {
      return res.status(409).json({ message: "Practitioner already exists." });
    }

    await newPractitioner.save();
    res.status(201).json(newPractitioner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updatePractitioner = async (req: Request, res: Response) => {
  const { error } = validatePractitioner(req.body);

  if (error) {
    return res.status(422).json({ message: error.details });
  }

  const id = req.params.practitioner_id;

  const {
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    icuSpecialist,
    assetUrl,
  } = req.body;

  const newPractitioner = {
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    icuSpecialist,
    assetUrl,
  };

  try {
    await practitionerModel.findByIdAndUpdate(id, newPractitioner, {
      new: true,
    });
    res.status(200).json(newPractitioner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const deletePractitioner = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  try {
    const practitioner = await practitionerModel.findByIdAndRemove(id);
    res.status(202).json(practitioner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getPractitioner = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  try {
    const practitioner = await practitionerModel.find({ _id: id });
    res.status(202).json(practitioner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getPractitioners = async (req: Request, res: Response) => {
  try {
    const practitioners = await practitionerModel.find();
    res.status(200).json(practitioners);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  addPractitioner,
  getPractitioner,
  getPractitioners,
  updatePractitioner,
  deletePractitioner,
};
