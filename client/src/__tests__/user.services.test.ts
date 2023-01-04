import { useHistory } from "react-router-dom";
import {
  signInUser,
  signUpUser,
  getUsers,
  deleteUser,
  forgetPassword,
  resetPassword,
} from "../services/user.service";

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => {
      /** */
    },
  };
});

const dummy_user = {
  _id: "3435",
  username: "Jone Doe",
  email: "jonedoe@gmail.com",
  password: "jone123",
};

jest.mock("../services/user.service");

describe("Test sign in service", () => {
  (signInUser as jest.Mock).mockResolvedValue({
    errorMessage: "Something went wrong.",
  });

  it("should mock signInUser method", async () => {
    const { errorMessage } = await signInUser(
      {},
      {
        history: useHistory(),
        setUserInfo: () => {
          /** */
        },
      }
    );

    expect(errorMessage).toBe("Something went wrong.");
  });
});

describe("Test sign up service", () => {
  (signUpUser as jest.Mock).mockResolvedValue({
    errorMessage: "Something went wrong.",
  });

  it("should mock signUpUser method", async () => {
    const { errorMessage } = await signUpUser(
      {},
      {
        history: useHistory(),
        setUserInfo: () => {
          /** */
        },
      }
    );

    expect(errorMessage).toBe("Something went wrong.");
  });
});

describe("Users operations", () => {
  (getUsers as jest.Mock).mockResolvedValue({ response: [{ ...dummy_user }] });
  (deleteUser as jest.Mock).mockResolvedValue({ error: null });
  (forgetPassword as jest.Mock).mockResolvedValue({ error: null });
  (resetPassword as jest.Mock).mockResolvedValue({
    error: "Something went wrong.",
  });

  it("should mock getUsers method", async () => {
    const { response } = await getUsers();

    expect(response).toEqual([{ ...dummy_user }]);
  });

  it("should mock deleteUser method", async () => {
    const { error } = await deleteUser(dummy_user);

    expect(error).toBe(null);
  });

  it("should mock forgetPassword method", async () => {
    const { error } = await forgetPassword({});

    expect(error).toBe(null);
  });

  it("should mock resetPassword method", async () => {
    const { error } = await resetPassword("48958", {});

    expect(error).toBe("Something went wrong.");
  });
});
