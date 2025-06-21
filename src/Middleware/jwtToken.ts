import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export type Tokenload = {
  userId: number;
};
// importing jwt secrete code from env file

const JWT_SECERETE = process.env.JWT_SECRETE || "";

if (!JWT_SECERETE) {
  throw new Error("Enter the jwt secerete token");
}

// generating the jwt refresh token
const EXPIRE_REFRESH_TOKEN = 7 * 24 * 60 * 60;
function generateRefreshToken(loadToken: Tokenload) {
  const rToken = sign(loadToken, JWT_SECERETE, {
    expiresIn: EXPIRE_REFRESH_TOKEN,
  });
  return rToken;
}
// verifying the refresh token

function verifyRefreshToken(refreshToken: string): Tokenload {
  const checkRefresh = verify(refreshToken, JWT_SECERETE);
  return checkRefresh as Tokenload;
}

// generating access token
const EXPIRE_ACCESS_TOKEN = 150;
function generateAccessToken(loadToken: Tokenload) {
  const aToken = sign(loadToken, JWT_SECERETE, {
    expiresIn: EXPIRE_ACCESS_TOKEN,
  });
  return aToken;
}

// verifying the access token
function verifyAccessToken(accessToken: string): Tokenload {
  const checkAccess = verify(accessToken, JWT_SECERETE);
  return checkAccess as Tokenload;
}

// exporting function

export {
  generateRefreshToken,
  verifyRefreshToken,
  generateAccessToken,
  verifyAccessToken,
};
