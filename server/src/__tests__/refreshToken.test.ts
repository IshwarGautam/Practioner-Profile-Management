import jwt from "jsonwebtoken";
import { handleRefreshToken } from "../services/user.service";

jest.mock("jsonwebtoken");

describe("Refresh token", () => {
  it("should return status code of 403 on invalid refresh token.", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ err: true, user: {} });

    const invalidToken = "hdf87f";

    const response = handleRefreshToken(invalidToken);

    expect(response.status).toBe(403);
    expect(response.data.message).toBe("Invalid refresh token");
  });

  it("should return status code of 200 when refresh token is found.", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ err: false, user: {} });

    const validToken = "vfgf56";

    (jwt.sign as jest.Mock).mockReturnValue("some_token");

    const response = handleRefreshToken(validToken);

    expect(response.status).toBe(200);
    expect(response.data.token).toBe("some_token");
  });
});
