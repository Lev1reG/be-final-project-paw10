const express = require("express");

const router = express.Router();

const bookController = require("../controllers/book");
const auth = require("../middlewares/authentication");

router.post("/", auth.ensureAdmin, bookController.createNewBook);
router.post("/populate", auth.ensureAdmin, bookController.createNewBooks);
router.get("/", bookController.retrieveAllBooks);
router.get("/:id", bookController.retrieveBookById);
router.patch("/:id", auth.ensureAdmin, bookController.updateBook);
router.delete("/:id", auth.ensureAdmin, bookController.deleteBook);
router.post("/borrow/:id", auth.ensureCustomer, bookController.borrowBook);
router.post("/return/:id", auth.ensureCustomer, bookController.returnBook);
router.get("/records", auth.ensureCustomer, bookController.getBorrowingRecords);

module.exports = router;
