const { decodeSessionJwt } = require("../helpers/authentication");
const { getUserBySessionToken } = require("../models/User");

const ensureCustomer = async (req, res, next) => {
  try {
    const decodedSession = decodeSessionJwt(req, res);

    const existingUser = await getUserBySessionToken(
      decodedSession.sessionToken,
    );

    if (!existingUser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (existingUser.role !== "customer") {
      return res.status(401).json({
        message: "You are not customer.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    }); 
  }
};

const ensureAdmin = async (req, res, next) => {
  try {
    const decodedSession = decodeSessionJwt(req, res);

    const existingUser = await getUserBySessionToken(
      decodedSession.sessionToken,
    );

    if (!existingUser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (existingUser.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  ensureAdmin,
  ensureCustomer,
};
