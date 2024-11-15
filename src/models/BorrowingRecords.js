const mongoose = require("mongoose");

const BorrowingRecordSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["borrowed", "returned"],
    default: "borrowed",
  },
});

const BorrowingRecord = mongoose.model(
  "BorrowingRecord",
  BorrowingRecordSchema,
);

const createBorrowingRecord = (values) =>
  new BorrowingRecord(values).save().then((record) => record.toObject());

const alreadyBorrowed = async (bookId, userId) => {
  const record = await BorrowingRecord.findOne({
    book: bookId,
    user: userId,
    status: "borrowed",
  });

  return record;
};

module.exports = {
  BorrowingRecord,
  createBorrowingRecord,
  alreadyBorrowed,
}
