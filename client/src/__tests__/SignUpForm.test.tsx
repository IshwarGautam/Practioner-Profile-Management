import { render } from "react-dom";
import "@testing-library/jest-dom";
import { useHistory } from "react-router-dom";
import { fireEvent } from "@testing-library/react";
import { signUpUser } from "../services/user.service";
import SignUpForm from "../components/Form/SignUpForm";

global.console = {
  ...console,
  error: jest.fn(),
};

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => {
      /** */
    },
  };
});

jest.mock("../services/user.service");

describe("Sign up Component test", () => {
  let container: HTMLDivElement;

  (signUpUser as jest.Mock).mockResolvedValue({
    errorMessage: null,
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    render(
      <SignUpForm
        history={useHistory()}
        setUserInfo={() => {
          /** */
        }}
      ></SignUpForm>,
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

  it("renders correctly initial document with data-test query", () => {
    expect(
      container.querySelector("[data-test='signup-form']")
    ).toBeInTheDocument();
  });

  it("Passes data correctly", () => {
    const inputs = container.querySelectorAll("input");
    const loginInput = inputs[0];
    const passwordInput = inputs[1];
    const confirmPasswordInput = inputs[2];

    const button = container.querySelectorAll("button");
    const submitButton = button[0];

    fireEvent.change(loginInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePass" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "somePass" } });
    fireEvent.click(submitButton);

    expect(loginInput.value).toBe("someUser");
    expect(passwordInput.value).toBe(confirmPasswordInput.value);
  });
});
