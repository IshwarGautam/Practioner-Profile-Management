import { uploadImage } from "../services/uploadImage.service";

jest.mock("../services/uploadImage.service");

const dummy_response = {
  data: {
    asset_id: "ea6cc27d3e1cfaab4dec4bd58e3e9fac",
    public_id: "pw0rfxgv7pds002erxmn",
    version: 1672905024,
    version_id: "17cb47bc4e50488e5ced3dc954142f32",
    signature: "de244eb4ba5c2c255f67795222a74e7d59646e7b",
    width: 100,
    height: 67,
    format: "jpg",
    resource_type: "image",
    created_at: "2023-01-05T07:50:24Z",
    tags: [],
    bytes: 1508,
    type: "upload",
    etag: "7d54664c007814631e67b42ad37300ea",
    placeholder: false,
    url: "http://res.cloudinary.com/dly7e04zt/image/upload/v1672905024/pw0rfxgv7pds002erxmn.jpg",
    secure_url:
      "https://res.cloudinary.com/dly7e04zt/image/upload/v1672905024/pw0rfxgv7pds002erxmn.jpg",
    folder: "",
    access_mode: "public",
    original_filename: "biker-g8abd9fb54_1920",
  },
  status: 200,
  statusText: "OK",
  headers: {
    "cache-control": "max-age=0, private, must-revalidate",
    "content-type": "application/json; charset=utf-8",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ["xhr", "http"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    method: "post",
    url: "https://api.cloudinary.com/v1_1/dly7e04zt/image/upload",
    data: {},
  },
  request: {},
};

describe("Test upload image service", () => {
  (uploadImage as jest.Mock).mockResolvedValue({ response: dummy_response });

  it("should mock uploadImage method", async () => {
    const { response } = await uploadImage({}, "");

    expect(response).toBe(dummy_response);
  });
});
