const express = require("express");

const router = express.Router();

const bookController = require("../controllers/book");
const auth = require("../middlewares/authentication");

router.post("/", auth.ensureAdmin, bookController.createNewBook);
router.get("/", bookController.retrieveAllBooks);
router.get("/:id", auth.ensureAdmin, bookController.retrieveBookById);
router.patch("/:id", auth.ensureAdmin, bookController.updateBook);
router.delete("/:id", auth.ensureAdmin, bookController.deleteBook);

module.exports = router;
