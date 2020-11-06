class Book {
  constructor(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
  }
}

function getBooksFromLocal() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

function addBookToLocal(book) {
  const books = getBooksFromLocal();
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
}

function removeBookFromLocal(title, author, pages) {
  const books = getBooksFromLocal();

  books.forEach((b, index) => {
    if (b.title === title && b.author === author && b.pages === pages) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}

function addBook(book) {
  const table = document.querySelector('#book-list');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>${book.pages}</td>
    <td><button class ="btn btn-info read">Unread</btn></td>
    <td><button class ="btn btn-danger delete">X</btn></td>
  `;

  table.appendChild(row);
}

function displayBooks() {
  const myBookStore = getBooksFromLocal();

  myBookStore.forEach((book) => {
    addBook(book);
  });
}

function removeBook(element) {
  if (element.classList.contains('delete')) {
    element.parentElement.parentElement.remove();
  }
}

function toggleClasses() {
  document.getElementById('book-form').classList.toggle('d-none');
  document.getElementById('hidden').classList.toggle('d-none');
}

document.addEventListener('DOMContentLoaded', displayBooks());

document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  const author = e.target.author.value;
  const title = e.target.title.value;
  const pages = e.target.pages.value;

  const book = new Book(author, title, pages);

  addBook(book);
  addBookToLocal(book);
  toggleClasses();
});

document.getElementById('hidden').addEventListener('click', () => {
  toggleClasses();
});

document.getElementById('book-list').addEventListener('click', e => {
  const element = e.target;

  removeBook(element);

  if (element.classList.contains('delete')) {
    const pre = e.target.parentElement.previousElementSibling.previousElementSibling;
    const pages = pre.textContent;
    const title = pre.previousElementSibling.textContent;
    const author = pre.previousElementSibling.previousElementSibling.textContent;
    removeBookFromLocal(title, author, pages);
  }
});

document.getElementById('book-list').addEventListener('click', e => {
  const element = e.target;

  if (element.classList.contains('read')) {
    if (element.innerHTML === 'Unread') {
      element.innerHTML = 'Read';
    } else {
      element.innerHTML = 'Unread';
    }
  }
});