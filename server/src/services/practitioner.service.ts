const { practitionerModel } = require("../models/practitioner.model");

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

/**
 * Service for handling add practitioner
 *
 * @param payload PractitionerType
 * @returns {object}
 */
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

/**
 * Service for handling get practitioner
 *
 * @param id string | number
 * @returns {object}
 */
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

/**
 * Service for handling get all practitioners
 *
 * @returns {object}
 */
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

/**
 * Service for handling update practitioner
 *
 * @param payload PractitionerType
 * @param id string | number
 * @returns {object}
 */
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
    const existingPractitioner = await practitionerModel.find({ email });

    if (
      existingPractitioner.length &&
      (existingPractitioner.length === 2 ||
        existingPractitioner[0]._id.toString() !== id)
    ) {
      return {
        status: 409,
        data: { message: "Practitioner already exists." },
      };
    }

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

/**
 * Service for handling delete practitioner
 *
 * @param id string | number
 * @returns {object}
 */
export const handleDeletePractitioner = async (id: string | number) => {
  try {
    const practitioner = await practitionerModel.findByIdAndRemove(id);

    return {
      status: 202,
      data: practitioner,
    };
  } catch {
    return {
      status: 500,
      data: { message: "Something went wrong." },
    };
  }
};
