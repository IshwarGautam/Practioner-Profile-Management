import { practitionerModel } from "../models/practitioner.model";
import {
  handleGetPractitioner,
  handleGetAllPractitioners,
} from "../services/practitioner.service";

jest.mock("../models/practitioner.model");

const payload = {
  _id: 1,
  fullName: "Martin Luthar",
  email: "martin@gmail.com",
  contact: "9855555111",
  dob: "2022-12-07",
  workingDays: 5,
  startTime: "09:00",
  endTime: "18:00",
};

describe("Get practitioner/s details", () => {
  it("should return a status code of 202 when a practitioner detail is fetched successfully.", async () => {
    (practitionerModel.find as jest.Mock).mockResolvedValueOnce(payload);

    const response = await handleGetPractitioner(payload._id);

    expect(response.status).toBe(202);
    expect(response.data).toEqual(payload);
  });

  it("should return a status code of 202 when all practitioner details get fetched successfully.", async () => {
    (practitionerModel.find as jest.Mock).mockResolvedValueOnce([
      { ...payload },
    ]);

    const response = await handleGetAllPractitioners();

    expect(response.status).toBe(200);
    expect(response.data).toEqual([{ ...payload }]);
  });
});
