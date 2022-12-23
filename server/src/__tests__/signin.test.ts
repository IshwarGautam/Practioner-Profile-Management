import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { handleUserSignin } from "../services/user.service";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user.model");

const payload = {
  email: "martinluthar@gmail.com",
  password: "martin98776",
};

describe("test signin function", () => {
  it("should send a status of 404 when no user is found during sign in", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(undefined);

    const response = await handleUserSignin(payload);

    expect(response.status).toBe(404);
    expect(response.data.message).toBe("User not found.");
  });

  it("should send a status of 401 on invalid credentials", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(payload);

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const response = await handleUserSignin(payload);

    expect(response.status).toBe(401);
    expect(response.data.message).toBe("Invalid Credentials.");
  });

  it("should send a status of 201 when user is verified", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(payload);

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    (jwt.sign as jest.Mock).mockReturnValue("some_token");

    const response = await handleUserSignin(payload);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("user");
    expect(response.data).toHaveProperty("accessToken");
    expect(response.data).toHaveProperty("refreshToken");
    expect(response.data.user).toEqual(payload);
    expect(response.data.accessToken).toBe("some_token");
    expect(response.data.refreshToken).toBe("some_token");
  });
});
