class Book {
  constructor(author, title, pages, read = 'Unread') {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}


class BookStorage {

  static getBooksFromLocal = () => JSON.parse(localStorage.getItem('books')) || [];

  static addBookToLocal(book) {
    const books = BookStorage.getBooksFromLocal();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static findBook(title, author, pages) {
    const books = BookStorage.getBooksFromLocal();
    let i = -1;

    books.forEach((b, index) => {
      if (b.title === title && b.author === author && b.pages === pages) {
        i = index;
      }
    });

    return i;
  }

  static removeBookFromLocal(title) {
    const books = BookStorage.getBooksFromLocal();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

}



document.addEventListener('DOMContentLoaded', UI.displayBooks());

document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  const author = e.target.author.value;
  const title = e.target.title.value;
  const pages = e.target.pages.value;
  const read = (e.target.read.checked) ? 'Read' : 'Unread';

  if (author === '' || title === '' || pages === '') {
    showMsg('Please fill out the required fields', 'danger');
  } else {
    const book = new Book(author, title, pages, read);

    UI.addBook(book);
    BookStorage.addBookToLocal(book);
    UI.formReset();
    UI.toggleClasses();
  }
});

document.getElementById('hidden').addEventListener('click', () => {
  UI.toggleClasses();
});

document.getElementById('book-list').addEventListener('click', e => {
  const element = e.target;

  UI.removeBook(element);

  if (element.classList.contains('delete')) {
    const pre = element.parentElement.previousElementSibling;
    const title = pre.previousElementSibling.previousElementSibling.textContent;
    BookStorage.removeBookFromLocal(title);
  }
});

document.getElementById('book-list').addEventListener('click', e => {
  const element = e.target;

  if (element.classList.contains('read')) {
    const pre = e.target.parentElement.previousElementSibling;
    const pages = pre.textContent;
    const title = pre.previousElementSibling.textContent;
    const author = pre.previousElementSibling.previousElementSibling.textContent;

    const books = BookStorage.getBooksFromLocal();
    const index = BookStorage.findBook(title, author, pages);

    if (index >= 0) {
      if (element.innerHTML === 'Unread') {
        element.innerHTML = 'Read';
        books[index].read = 'Read';
        localStorage.setItem('books', JSON.stringify(books));
      } else {
        element.innerHTML = 'Unread';
        books[index].read = 'Unread';
        localStorage.setItem('books', JSON.stringify(books));
      }
    }
  }
});
