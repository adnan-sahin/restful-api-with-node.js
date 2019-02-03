require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Integration Test!!!', () => {
  it('Should allow a book to be posted and return read and _id', (done) => {
    const bookPost = { title: 'Test Book', author: 'Test Author', genre: 'Test History' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.should.have.property('_id');
        results.body.read.should.equal(false);
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });
  after((done) => {
    mongoose.connection.close((err) => {
      console.error(err);
    });
    app.server.close(done());
  });
});
