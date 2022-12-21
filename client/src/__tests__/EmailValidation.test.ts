import { handleEmailValidation } from "../utils/emailValidation";

const badValueInputs = {
  email1: "joe",
  email2: 1234,
  email3: [],
  email4: "joe@",
  email5: "joe@gmail",
};

const goodValueInputs = {
  email6: "joe@gmail.com",
  email7: "joe@leapfrogtechnology.com",
};

describe("test email validation", () => {
  it.each(Object.values(badValueInputs).map((input) => [input]))(
    `should return error message on invalid email`,
    (input: any) => {
      const result = handleEmailValidation(input);

      expect(result).toBe("Please provide correct email.");
    }
  );

  it.each(Object.values(goodValueInputs).map((input) => [input]))(
    `should return undefined on valid email`,
    (input: string) => {
      const result = handleEmailValidation(input);

      expect(result).toBe(undefined);
    }
  );
});
