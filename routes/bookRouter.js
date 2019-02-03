const express = require('express');
const booksController = require('../controllers/booksController');

/* eslint-disable no-param-reassign */
function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  bookRouter.route('/books/:bookId')
    .get(controller.getById)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteBook);

  return bookRouter;
}

module.exports = routes;
