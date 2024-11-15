const mongoose = require("mongoose");
const {
  getBookByIsbn,
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  BookModel,
} = require("../models/Book");

const retrieveAllBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const books = await getBooks()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBooks = await getBooks().countDocuments();

    return res.status(200).json({
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        pageSize: limit,
        totalBooks,
      },
      books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const retrieveBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const book = await getBookById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const createNewBooks = async (req, res) => {
  try {
    const books = req.body;

    // Check if the input is an array
    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).json({
        message: "Request body must be an array of books",
      });
    }

    // Validate required fields for each book
    const missingFields = books.some(
      (book) => !book.title || !book.authors || !book.isbn || !book.stock,
    );

    if (missingFields) {
      return res.status(400).json({
        message:
          "One or more books are missing required fields (title, authors, isbn, stock)",
      });
    }

    // Check if any of the ISBNs already exist
    const isbns = books.map((book) => book.isbn);
    const existingBooks = await BookModel.find({ isbn: { $in: isbns } });

    if (existingBooks.length > 0) {
      const existingIsbns = existingBooks.map((book) => book.isbn);
      return res.status(400).json({
        message: `Books with the following ISBNs already exist: ${existingIsbns.join(", ")}`,
      });
    }

    // Create new books using insertMany for bulk insertion
    const newBooks = await BookModel.insertMany(books);

    return res.status(201).json({
      message: "Books registered successfully",
      books: newBooks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const createNewBook = async (req, res) => {
  try {
    const {
      title,
      authors,
      isbn,
      publisher,
      year,
      genres,
      description,
      language,
      coverImageUrl,
      stock,
      pages,
    } = req.body;

    if (!title || !authors || !isbn || !stock) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingBook = await getBookByIsbn(isbn);

    if (existingBook) {
      return res.status(400).json({
        message: "Book already exists",
      });
    }

    const newBook = await createBook({
      title,
      authors,
      isbn,
      publisher,
      year,
      genres,
      description,
      language,
      coverImageUrl,
      stock,
      pages,
    });

    return res.status(201).json({
      message: "Book registered successfully",
      book: newBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await deleteBookById(id);

    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      authors,
      isbn,
      publisher,
      year,
      genres,
      description,
      language,
      coverImageUrl,
      stock,
      pages,
    } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingBook = await getBookById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const updatedBook = await updateBookById(id, {
      title,
      authors,
      isbn,
      publisher,
      year,
      genres,
      description,
      language,
      coverImageUrl,
      stock,
      pages,
    });

    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const searchBooks = async (req, res) => {};

module.exports = {
  createNewBook,
  retrieveAllBooks,
  updateBook,
  retrieveBookById,
  deleteBook,
  createNewBooks,
};
