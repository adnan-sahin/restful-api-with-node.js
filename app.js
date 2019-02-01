const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }).then(() => {
  console.log('Database connection successful');
}).catch((err) => {
  console.error(err);
});


const port = process.env.PORT || 3000;
const bookRouter = express.Router();

const Book = require('./models/bookModel');

bookRouter.route('/books')
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
        console.log(books);
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
        console.log(book);
        return res.json(book);
      }
    );
  });

app.use('/api', bookRouter);
// app.use(bookRouter);

app.get('/', (req, res) => {
  res.send('Welocome to Express!!');
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
