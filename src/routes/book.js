const express = require("express");

const router = express.Router();

const bookController = require("../controllers/book");
const auth = require("../middlewares/authentication");

router.post("/", auth.ensureAdmin, bookController.createNewBook);
router.get("/", bookController.retrieveAllBooks);
router.patch("/:id", auth.ensureAdmin, bookController.updateBook);

module.exports = router;
