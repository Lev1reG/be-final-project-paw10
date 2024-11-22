const express = require("express");

const router = express.Router();

const bookController = require("../controllers/book");
const auth = require("../middlewares/authentication");
const { validateObjectId } = require("../middlewares/book");

router.post("/", auth.ensureAdmin, bookController.createNewBook);
router.post("/populate", auth.ensureAdmin, bookController.createNewBooks);
router.get("/", bookController.retrieveAllBooks);
router.get("/search", bookController.searchBooks);
router.get("/:id", validateObjectId,bookController.retrieveBookById);
router.patch("/:id", auth.ensureAdmin, validateObjectId, bookController.updateBook);
router.delete("/:id", auth.ensureAdmin, validateObjectId, bookController.deleteBook);
router.post("/:id/borrow", auth.ensureCustomer, validateObjectId, bookController.borrowBook);
router.post("/:id/return", auth.ensureCustomer, validateObjectId, bookController.returnBook);

module.exports = router;
