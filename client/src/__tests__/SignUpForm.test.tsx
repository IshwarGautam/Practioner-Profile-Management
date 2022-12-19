import { render } from "react-dom";
import SignUpForm from "../components/Form/SignUpForm";

global.console = {
  ...console,
  error: jest.fn(),
};

describe("Sign up Component test", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    render(
      <SignUpForm onClick={() => {}} setUserInfo={() => {}}></SignUpForm>,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");

    expect(inputs).toHaveLength(4);
    expect(inputs[0].name).toBe("username");
    expect(inputs[0].type).toBe("text");
    expect(inputs[1].name).toBe("email");
    expect(inputs[1].type).toBe("text");
    expect(inputs[2].name).toBe("password");
    expect(inputs[2].type).toBe("password");
    expect(inputs[3].name).toBe("confirmPassword");
    expect(inputs[3].type).toBe("password");
  });
});
