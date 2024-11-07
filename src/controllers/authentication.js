const {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserBySessionToken,
} = require("../models/User");

const {
  randomBase64,
  hashToHex,
  sendCookie,
  decodeSessionJwt,
} = require("../helpers/authentication");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const existingEmail = await getUserByEmail(email);
    const existingUsername = await getUserByUsername(username);

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already in use",
      });
    }

    const salt = randomBase64();

    await createUser({
      username,
      email,
      authentication: { salt, password: hashToHex(salt, password) },
    });

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const existingUser = await getUserByEmail(email).select(
      "+authentication.password +authentication.salt",
    );

    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const expectedHash = hashToHex(existingUser.authentication.salt, password);
    const isPassValid = expectedHash === existingUser.authentication.password;

    if (!isPassValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const sessionSalt = randomBase64();
    existingUser.authentication.sessionToken = hashToHex(
      sessionSalt,
      existingUser._id.toString(),
    );

    await existingUser.save();

    if (!process.env.JWT_VERIFICATION_SECRET) {
      throw new Error("JWT_VERIFICATION_SECRET not found in .env file");
    }

    const sessionJwt = jwt.sign(
      { sessionToken: existingUser.authentication.sessionToken },
      process.env.JWT_VERIFICATION_SECRET,
      { expiresIn: "1d" },
    );

    sendCookie(res, sessionJwt);

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
