import "@testing-library/jest-dom";
import { getPractitioner } from "../services/practitioner.service";
import PractitionerForm from "../components/Form/PractitionerForm";
import { render as renderComponent } from "@testing-library/react";

global.console = {
  ...console,
  error: jest.fn(),
};

const data = {
  fullName: "jone doe",
  email: "jone@gmail.com",
  contact: 9876734897,
  dob: "2000-01-29",
  workingDays: 5,
  startTime: "09:00",
  endTime: "18:00",
};

jest.mock("react-router-dom", () => {
  return {
    useParams: () => ({
      practitioner_id: "123",
    }),
    useHistory: () => {
      /** */
    },
  };
});

jest.mock("../services/practitioner.service");

describe("Edit practitioner form", () => {
  it("renders container", () => {
    (getPractitioner as jest.Mock).mockResolvedValue({
      response: { ...data },
    });

    const { container } = renderComponent(<PractitionerForm />);

    expect(container).not.toBeNull();
  });
});
