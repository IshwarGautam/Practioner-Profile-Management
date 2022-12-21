const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

import { handleUserSignup } from "../services/user.service";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user.model");

const payload = {
  username: "Martin Luthar",
  email: "martinluthar@gmail.com",
  password: "martin98776",
};

describe("test signup function", () => {
  it("should send a status code of 409 when user exists", async () => {
    userModel.findOne.mockResolvedValueOnce(payload);

    const response = await handleUserSignup(payload);

    expect(response.status).toBe(409);
    expect(response.data.message).toBe("User already exists.");
  });

  it("should send a status of 201 when new user is created", async () => {
    userModel.findOne.mockResolvedValueOnce(undefined);

    bcrypt.hash.mockResolvedValueOnce("hash_password");

    userModel.create.mockResolvedValueOnce({
      _id: 1,
      ...payload,
    });

    jwt.sign.mockReturnValue("some_token");

    const response = await handleUserSignup(payload);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("user");
    expect(response.data).toHaveProperty("accessToken");
    expect(response.data).toHaveProperty("refreshToken");
    expect(response.data.user).toEqual({
      _id: 1,
      ...payload,
    });
    expect(response.data.accessToken).toBe("some_token");
    expect(response.data.refreshToken).toBe("some_token");
  });
});
