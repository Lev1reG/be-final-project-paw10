const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  publisher: String,
  year: Number,
  genres: [String],
  description: String,
  language: String,
  coverImageUrl: String,
  pages: Number,
  stock: {
    type: Number,
    required: true,
  },
});

const BookModel = mongoose.model("Book", BookSchema);

const getBooks = () => BookModel.find();

const getBookByIsbn = (isbn) => BookModel.findOne({ isbn });

const getBookById = (id) => BookModel.findById(id);

const updateBookById = (id, values) =>
  BookModel.findByIdAndUpdate(id, values, {
    new: true,
    runValidators: true,
  });

const createBook = (values) =>
  new BookModel(values).save().then((book) => book.toObject());

const deleteBookById = (id) => BookModel.findOneAndDelete({ _id: id });

const getBooksByAuthor = (author) =>
  BookModel.find({ authors: { $regex: new RegExp(author, i) } });

const getBooksByGenre = (genre) =>
  BookModel.find({ genres: { $regex: new RegExp(genre, i) } });

const getBooksByYear = (year) => BookModel.find({ year });

module.exports = {
  getBooks,
  getBookByIsbn,
  getBookById,
  updateBookById,
  createBook,
  deleteBookById,
  getBooks,
  getBooksByAuthor,
  getBooksByGenre,
  getBooksByYear,
  BookModel,
};
