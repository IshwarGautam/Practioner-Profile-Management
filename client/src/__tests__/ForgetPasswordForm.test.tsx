import { render } from "react-dom";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { forgetPassword } from "../services/user.service";
import ForgetPasswordForm from "../components/Form/ForgetPasswordForm";

jest.mock("../services/user.service");

global.console = {
  ...console,
  error: jest.fn(),
};

describe("test forget password form", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    (forgetPassword as jest.Mock).mockResolvedValue({
      error: null,
    });

    render(
      <ForgetPasswordForm
        onBack={() => {
          /** */
        }}
      ></ForgetPasswordForm>,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");

    expect(inputs).toHaveLength(1);
    expect(inputs[0].name).toBe("email");
    expect(inputs[0].type).toBe("text");
  });

  it("renders correctly initial document with data-test query", () => {
    expect(
      container.querySelector("[data-test='forget-password-form']")
    ).toBeInTheDocument();
  });

  it("Passes data correctly", () => {
    const inputs = container.querySelectorAll("input");
    const emailInput = inputs[0];

    const button = container.querySelectorAll("button");
    const resetButton = button[0];

    fireEvent.change(emailInput, { target: { value: "jonedoe@gmail.com" } });
    fireEvent.click(resetButton);

    expect(emailInput.value).toBe("jonedoe@gmail.com");
  });
});
