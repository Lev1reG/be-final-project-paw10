const { getBookByIsbn, createBook, getBooks } = require("../models/Book");

const retrieveAllBooks = async (req, res) => {
  try {
    const books = await getBooks();
    return res.status(200).send(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
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

module.exports = {
  createNewBook,
  retrieveAllBooks,
};
