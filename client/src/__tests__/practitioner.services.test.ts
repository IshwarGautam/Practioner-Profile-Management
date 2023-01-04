import { useHistory } from "react-router-dom";
import {
  getPractitioner,
  addPractitioner,
  updatePractitioner,
} from "../services/practitioner.service";

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => {
      /** */
    },
  };
});

jest.mock("../services/practitioner.service");

const dummy_practitioner = {
  _id: "3435",
  fullName: "Jone Doe",
  email: "jone@gmail.com",
  contact: 9878222234,
  dob: "2000-01-01",
  workingDays: 5,
  startTime: "09:00",
  endTime: "18:00",
};

describe("Test Practitioner Services", () => {
  (getPractitioner as jest.Mock).mockResolvedValue({
    response: { ...dummy_practitioner },
  });

  (updatePractitioner as jest.Mock).mockResolvedValue({
    errorMessage: null,
  });

  (addPractitioner as jest.Mock).mockResolvedValue({
    errorMessage: "Practitioner already exist in the database.",
  });

  it("should mock getPractitioner method", async () => {
    const { response } = await getPractitioner("3435", useHistory());

    expect(response).toEqual(dummy_practitioner);
  });

  it("should mock updatePractitioner method", async () => {
    const { errorMessage } = await updatePractitioner(
      "3435",
      { ...dummy_practitioner, workingDays: 4 },
      useHistory()
    );

    expect(errorMessage).toBe(null);
  });

  it("should mock addPractitioner method", async () => {
    const { errorMessage } = await addPractitioner(
      { ...dummy_practitioner },
      useHistory()
    );

    expect(errorMessage).toBe("Practitioner already exist in the database.");
  });
});
