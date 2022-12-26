import { render } from "react-dom";
import "@testing-library/jest-dom";
import PractitionerForm from "../components/Form/PractitionerForm";
import { fireEvent, render as renderComponent } from "@testing-library/react";

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
      id: "123",
    }),
    useHistory: () => {},
  };
});

describe("Practitioner Form Component test", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    render(<PractitionerForm />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");

    expect(inputs).toHaveLength(8);
    expect(inputs[0].name).toBe("fullName");
    expect(inputs[0].type).toBe("text");
    expect(inputs[1].name).toBe("email");
    expect(inputs[1].type).toBe("email");
    expect(inputs[2].name).toBe("contact");
    expect(inputs[2].type).toBe("number");
    expect(inputs[3].name).toBe("dob");
    expect(inputs[3].type).toBe("date");
    expect(inputs[4].name).toBe("workingDays");
    expect(inputs[4].type).toBe("number");
    expect(inputs[5].name).toBe("startTime");
    expect(inputs[5].type).toBe("time");
    expect(inputs[6].name).toBe("endTime");
    expect(inputs[6].type).toBe("time");
    expect(inputs[7].type).toBe("file");
  });

  it("renders correctly initial document with data-test query", () => {
    expect(
      container.querySelector("[data-test='practitioner-form']")
    ).toBeInTheDocument();
  });
});

describe("test data", () => {
  it("Passes data correctly", () => {
    const { container } = renderComponent(<PractitionerForm />);

    const nameInput: any = container.querySelector("input[name='fullName']");
    const emailInput: any = container.querySelector("input[name='email']");
    const contactInput: any = container.querySelector("input[name='contact']");
    const dobInput: any = container.querySelector("input[name='dob']");
    const workingDaysInput: any = container.querySelector(
      "input[name='workingDays']"
    );
    const startTimeInput: any = container.querySelector(
      "input[name='startTime']"
    );
    const endTimeInput: any = container.querySelector("input[name='endTime']");
    const fileInput: any = container.querySelector("input[name='file']");

    const button = container.querySelectorAll("button");
    const submitButton = button[0];

    fireEvent.change(nameInput, { target: { value: data.fullName } });
    fireEvent.change(emailInput, { target: { value: data.email } });
    fireEvent.change(contactInput, { target: { value: data.contact } });
    fireEvent.change(dobInput, { target: { value: data.dob } });
    fireEvent.change(workingDaysInput, { target: { value: data.workingDays } });
    fireEvent.change(startTimeInput, { target: { value: data.startTime } });
    fireEvent.change(endTimeInput, { target: { value: data.endTime } });
    fireEvent.click(submitButton);

    expect(nameInput.value).toBe(data.fullName);
    expect(emailInput.value).toBe(data.email);
    expect(parseInt(contactInput.value)).toBe(data.contact);
    expect(dobInput.value).toBe(data.dob);
    expect(parseInt(workingDaysInput.value)).toBe(data.workingDays);
    expect(startTimeInput.value).toBe(data.startTime);
    expect(endTimeInput.value).toBe(data.endTime);
  });
});
