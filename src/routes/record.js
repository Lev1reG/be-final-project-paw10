const express = require("express");

const router = express.Router();

const recordController = require("../controllers/record");
const auth = require("../middlewares/authentication");

router.get("/",  auth.ensureCustomer, recordController.getBorrowingRecords);

module.exports = router;
