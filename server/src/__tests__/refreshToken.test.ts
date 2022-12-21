import { refreshTokens, handleRefreshToken } from "../services/user.service";

const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("Refresh token", () => {
  it("should return status code of 403 when refresh token not found.", async () => {
    const refreshToken = "";
    const response = await handleRefreshToken(refreshToken);

    expect(response.status).toBe(403);
    expect(response.data.message).toBe("Refresh token not found, login again");
  });

  it("should return status code of 403 on invalid refresh token.", () => {
    jwt.verify.mockReturnValue({ err: true, user: {} });

    const invalidToken = "hdf87f";
    refreshTokens.push(invalidToken);

    const response = handleRefreshToken(invalidToken);

    expect(response.status).toBe(403);
    expect(response.data.message).toBe("Invalid refresh token");
  });

  it("should return status code of 200 when refresh token is found.", () => {
    jwt.verify.mockReturnValue({ err: false, user: {} });

    const validToken = "vfgf56";
    refreshTokens.push(validToken);

    jwt.sign.mockReturnValue("some_token");

    const response = handleRefreshToken(validToken);

    expect(response.status).toBe(200);
    expect(response.data.token).toBe("some_token");
  });
});
