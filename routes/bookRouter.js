const express = require('express');
/* eslint-disable no-param-reassign */
function routes(Book) {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();

      return res.status(201).json(book);
    })
    .get((req, res) => {
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
          return res.json(books);
        }
      );
    });

  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      Book.findById(
        req.params.bookId,
        (err, book) => {
          if (err) {
            return res.send(err);
          }
          return res.json(book);
        }
      );
    })
    .put((req, res) => {
      Book.findById(
        req.params.bookId,
        (err, book) => {
          if (err) {
            return res.send(err);
          }
          book.title = req.body.title;
          book.author = req.body.author;
          book.genre = req.body.genre;
          book.read = req.body.read;
          book.save();
          return res.json(book);
        }
      );
    });

  return bookRouter;
}

module.exports = routes;
