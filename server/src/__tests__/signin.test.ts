const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

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
    userModel.findOne.mockResolvedValueOnce(undefined);

    const response = await handleUserSignin(payload);

    expect(response.status).toBe(404);
    expect(response.data.message).toBe("User not found.");
  });

  it("should send a status of 401 on invalid credentials", async () => {
    userModel.findOne.mockResolvedValueOnce(payload);

    bcrypt.compare.mockResolvedValueOnce(false);

    const response = await handleUserSignin(payload);

    expect(response.status).toBe(401);
    expect(response.data.message).toBe("Invalid Credentials.");
  });

  it("should send a status of 201 when user is verified", async () => {
    userModel.findOne.mockResolvedValueOnce(payload);

    bcrypt.compare.mockResolvedValueOnce(true);

    jwt.sign.mockReturnValueOnce("some_token");

    const response = await handleUserSignin(payload);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("user");
    expect(response.data).toHaveProperty("token");
    expect(response.data.user).toBe(payload);
    expect(response.data.token).toBe("some_token");
  });
});
