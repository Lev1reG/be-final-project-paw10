const {
  getBookByIsbn,
  createBook,
  getBooks,
  getBookById,
  updateBookById,
} = require("../models/Book");

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

const retrieveBookById = async (req, res) => {
  try {
    const { id } = req.params;
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
    } = req.body;

    if (!id) {
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

module.exports = {
  createNewBook,
  retrieveAllBooks,
  updateBook,
  retrieveBookById,
};
