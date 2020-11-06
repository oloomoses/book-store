export default class Store {
  static getBooksFromLocal() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBookToLocal(book) {
    const books = Store.getBooksFromLocal();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBookFromLocal(title, author, pages) {
    const books = Store.getBooksFromLocal();

    books.forEach((b, index) => {
      if (b.title === title && b.author === author && b.pages === pages) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}