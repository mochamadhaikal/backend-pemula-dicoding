// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const books = require('./books');

// I use "req" to make it look simpler and also because I usually use express
const addBookHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length === 1;
  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
  }

  return h
    .response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    })
    .code(500);
};

const getAllBooksHandler = (req, h) => {
  const { name, reading, finished } = req.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter(
      (book) => book.name.toLowerCase().includes(name.toLowerCase()) !== false
    );
  }

  if (reading) {
    filteredBooks = filteredBooks.filter(
      (book) => Number(book.reading) === Number(reading)
    );
  }

  if (finished) {
    filteredBooks = filteredBooks.filter(
      (book) => Number(book.finished) === Number(finished)
    );
  }

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
};

const getBookByIdHandler = (req, h) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);

  if (book) {
    return h.response({
      status: 'success',
      data: { book },
    });
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
};

const editBookByIdHandler = (req, h) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString(),
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
};

const deleteBookByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
