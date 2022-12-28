import { render } from "react-dom";
import "@testing-library/jest-dom";
import { useHistory } from "react-router-dom";
import { fireEvent } from "@testing-library/react";
import { signInUser } from "../services/user.service";
import SignInForm from "../components/Form/SignInForm";

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

const mockData = {
  email: "jonedoe@gmail.com",
  password: "jonedoe",
};

describe("Login in Component test", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    (signInUser as jest.Mock).mockResolvedValue({
      response: null,
      error: {
        response: {
          status: 400,
        },
      },
    });

    render(
      <SignInForm
        history={useHistory()}
        setUserInfo={() => {
          /** */
        }}
      ></SignInForm>,
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

    const label = container.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });

  it("renders correctly initial document with data-test query", () => {
    expect(
      container.querySelector("[data-test='login-form']")
    ).toBeInTheDocument();
  });

  it("Passes credentials correctly", () => {
    const inputs = container.querySelectorAll("input");
    const loginInput = inputs[0];
    const passwordInput = inputs[1];

    const button = container.querySelectorAll("button");
    const loginButton = button[0];

    fireEvent.change(loginInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePass" } });
    fireEvent.click(loginButton);

    expect(loginInput.value).toBe("someUser");
    expect(passwordInput.value).toBe("somePass");
  });

  it("should return status code of 400 on unsuccessful api call", async () => {
    const { error } = await signInUser(mockData);

    expect(error.response.status).toEqual(400);
  });
});
