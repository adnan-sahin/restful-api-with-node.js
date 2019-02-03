function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send({ code: 2002, message: 'Title is required.' });
    }
    book.save();

    return res.status(201).json(book);
  }
  function get(req, res) {
    // const { query } = req;
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(
      query,
      (err, books) => {
        if (err) {
          return res.send(err);
        }
        const returnBooks = books.map((book) => {
          const newBook = book.toJSON();
          newBook.links = {};
          /* eslint-disable-next-line no-underscore-dangle */
          newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
          return newBook;
        });


        return res.json(returnBooks);
      }
    );
  }
  function getById(req, res) {
    const returnBook = req.book.toJSON();
    returnBook.links = {};
    const genre = req.book.genre.replace(' ', '%20');
    returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books?genre=${genre}`;
    res.json(returnBook);
  }
  function put(req, res) {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }
  function patch(req, res) {
    const { book } = req;
    /* eslint-disable-next-line no-underscore-dangle */
    if (req.body._id) {
      /* eslint-disable-next-line no-underscore-dangle */
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }
  function deleteBook(req, res) {
    req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  }
  return {
    get, getById, post, put, patch, deleteBook
  };
}

module.exports = booksController;
