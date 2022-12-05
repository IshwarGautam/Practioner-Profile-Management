import { Request, Response } from "express";

const practitionerModel = require("../models/practitioner");

const addPractitioner = async (req: Request, res: Response) => {
  const { fullName, email, contact, dob, workingDays, startTime, endTime } =
    req.body;

  const newPractitioner = new practitionerModel({
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
  });

  try {
    await newPractitioner.save();
    res.status(201).json(newPractitioner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updatePractitioner = async (req: Request, res: Response) => {
  const id = req.params.practitioner_id;

  const { fullName, email, contact, dob, workingDays, startTime, endTime } =
    req.body;

  const newPractitioner = {
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
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
  updatePractitioner,
  deletePractitioner,
  getPractitioners,
};
