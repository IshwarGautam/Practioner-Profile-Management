const { practitionerModel } = require("../models/practitioner.model");

import { handleDeletePractitioner } from "../services/practitioner.service";

jest.mock("../models/practitioner.model");

const payload = {
  _id: 1,
  fullName: "Martin Luthar",
  email: "martin@gmail.com",
  contact: 9855555111,
  dob: "2022-12-07",
  workingDays: 5,
  startTime: "09:00",
  endTime: "18:00",
};

describe("delete practitioner details", () => {
  it("should return a status code of 202 when partitioner detail successfully deleted", async () => {
    practitionerModel.findByIdAndRemove.mockResolvedValueOnce(payload);

    const response = await handleDeletePractitioner(1);

    expect(response.status).toBe(202);
    expect(response.data).toBe(payload);
  });
});
