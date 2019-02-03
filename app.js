const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  mongoose.connect('mongodb://localhost:27017/Integration_Test', { useNewUrlParser: true }).then(() => {
    console.log('Database connection successful(Test)');
  }).catch((err) => {
    console.error(err);
  });
} else {
  mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }).then(() => {
    console.log('Database connection successful(Real)');
  }).catch((err) => {
    console.error(err);
  });
}


const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);
// app.use(bookRouter);

app.get('/', (req, res) => {
  res.send('Welocome to Express!!');
});


app.server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
