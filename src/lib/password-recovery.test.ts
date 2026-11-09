import { expect, test } from "bun:test";
import { isRecoveryLink, validateNewPassword } from "./password-recovery";

test("new and confirmed passwords must match", () => {
  expect(validateNewPassword("NewPassword123", "Different123")).toBe("Passwords do not match.");
  expect(validateNewPassword("NewPassword123", "NewPassword123")).toBeNull();
});

test("password must contain at least six characters", () => {
  expect(validateNewPassword("12345", "12345")).not.toBeNull();
  expect(validateNewPassword("123456", "123456")).toBeNull();
});

test("only recovery links enable password reset", () => {
  expect(isRecoveryLink("#access_token=example&type=recovery")).toBe(true);
  expect(isRecoveryLink("#type=signup")).toBe(false);
  expect(isRecoveryLink("")).toBe(false);
});