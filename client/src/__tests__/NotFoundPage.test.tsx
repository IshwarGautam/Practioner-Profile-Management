import { render } from "react-dom";
import NotFoundPage from "../pages/404/NotFoundPage";
import { screen, fireEvent } from "@testing-library/react";

global.console = {
  ...console,
  error: jest.fn(),
};

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

describe("Not Found Page", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    render(<NotFoundPage></NotFoundPage>, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("should render not found page properly", () => {
    expect(screen.getByText("404 page")).toBeInTheDocument;
    expect(
      screen.getByText(
        "Looks like the page you are looking for is no longer here."
      )
    ).toBeInTheDocument;

    fireEvent.click(screen.getByTestId("back-btn"));
  });
});
