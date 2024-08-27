import crypto from "crypto";

export function generateShortHash(length = 6) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomBytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % charset.length;
    result += charset[index];
  }
  return result;
}
