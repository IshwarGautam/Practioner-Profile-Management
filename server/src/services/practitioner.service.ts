import { practitionerModel } from "../models/practitioner.model";

type PractitionerType = {
  fullName: string;
  email: string;
  contact: Number;
  dob: string;
  workingDays: Number;
  startTime: string;
  endTime: string;
  icuSpecialist: boolean;
  assetUrl: string;
};

export const handleAddPractitioner = async (payload: PractitionerType) => {
  const {
    fullName,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    assetUrl,
  } = payload;

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
      return {
        status: 409,
        data: { message: "Practitioner already exists." },
      };
    }

    await newPractitioner.save();

    return {
      status: 201,
      data: newPractitioner,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};

export const handleGetPractitioner = async (id: string | number) => {
  try {
    const practitioner = await practitionerModel.find({ _id: id });

    return {
      status: 202,
      data: practitioner,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};

export const handleGetAllPractitioners = async () => {
  try {
    const practitioners = await practitionerModel.find();

    return {
      status: 200,
      data: practitioners,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};

export const handleUpdatePractitioner = async (
  payload: PractitionerType,
  id: string | number
) => {
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
  } = payload;

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

    return {
      status: 200,
      data: newPractitioner,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};

export const handleDeletePractitioner = async (id: string | number) => {
  try {
    const practitioner = await practitionerModel.findByIdAndRemove(id);

    return {
      status: 202,
      data: practitioner,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};
