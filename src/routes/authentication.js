const express = require("express");

const router = express.Router();

const authController = require("../controllers/authentication");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/session", authController.getUserSession);
router.post("/logout", authController.logoutUser);

module.exports = router;
