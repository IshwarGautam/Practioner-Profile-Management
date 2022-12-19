import { render } from "react-dom";
import SignInForm from "../components/Form/SignInForm";

global.console = {
  ...console,
  error: jest.fn(),
};

describe("Login in Component test", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    render(
      <SignInForm onClick={() => {}} setUserInfo={() => {}}></SignInForm>,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");

    expect(inputs).toHaveLength(2);
    expect(inputs[0].name).toBe("email");
    expect(inputs[0].type).toBe("text");
    expect(inputs[1].name).toBe("password");
    expect(inputs[1].type).toBe("password");
  });
});
