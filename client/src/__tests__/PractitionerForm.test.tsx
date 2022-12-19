import { render } from "react-dom";
import PractitionerForm from "../components/Form/PractitionerForm";

global.console = {
  ...console,
  error: jest.fn(),
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
});
