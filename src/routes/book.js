const express = require("express");

const router = express.Router();

const bookController = require("../controllers/book");
const auth = require("../middlewares/authentication");
const { validateObjectId } = require("../middlewares/book");

router.post("/", auth.ensureAdmin, bookController.createNewBook);
router.post("/populate", auth.ensureAdmin, bookController.createNewBooks);
router.get("/", bookController.retrieveAllBooks);
router.get("/status", bookController.getTotalBooksAndBorrowedBooks);
router.get("/search", bookController.searchBooks);
router.get("/newest", bookController.getNewestBook);
router.get("/popular", bookController.getPopularBook);
router.get("/:id", validateObjectId, bookController.retrieveBookById);
router.patch(
  "/:id",
  auth.ensureAdmin,
  validateObjectId,
  bookController.updateBook,
);
router.delete(
  "/:id",
  auth.ensureAdmin,
  validateObjectId,
  bookController.deleteBook,
);
router.get(
  "/:id/borrow",
  validateObjectId,
  bookController.borrowBook,
);
router.get(
  "/:id/return",
  validateObjectId,
  bookController.returnBook,
);

module.exports = router;
