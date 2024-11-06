const {
  createUser,
  getUserByEmail,
  getUserByUsername,
} = require("../models/User");

const { randomBase64, hashToHex } = require("../helpers/authentication");

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

module.exports = {
  registerUser,
};
