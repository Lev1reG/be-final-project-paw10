const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const hashToHex = (salt, password) => {
  if (!process.env.CRYPTO_SECRET) {
    throw new Error("CRYPTO_SECRET not found in .env file");
  }

  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.CRYPTO_SECRET)
    .digest("hex");
};

const randomBase64 = () => {
  return crypto.randomBytes(128).toString("base64");
};

const decodeSessionJwt = (req, res) => {
  if (!process.env.JWT_VERIFICATION_SECRET) {
    throw new Error("JWT_VERIFICATION_SECRET not found in .env file");
  }

  const sessionJwt = req.cookies["PAW_10_2024"];

  if (!sessionJwt) {
    return res.status(401).json({
      message: "Cookie not found",
    });
  }

  const decodedToken = jwt.verify(
    sessionJwt,
    process.env.JWT_VERIFICATION_SECRET,
  );

  if (!decodedToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  return decodedToken;
};

const sendCookie = (res, cookie) => {
  res.cookie("PAW_10_2024", cookie, {
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

module.exports = {
  hashToHex,
  randomBase64,
  decodeSessionJwt,
  sendCookie,
};
