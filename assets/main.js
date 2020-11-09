class Book {
  constructor(author, title, pages, read = 'Unread') {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

const getBooksFromLocal = () => JSON.parse(localStorage.getItem('books')) || [];

function addBookToLocal(book) {
  const books = getBooksFromLocal();
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
}

function findBook(title, author, pages) {
  const books = getBooksFromLocal();
  let i = -1;

  books.forEach((b, index) => {
    if (b.title === title && b.author === author && b.pages === pages) {
      i = index;
    }
  });

  return i;
}

function removeBookFromLocal(title, author, pages) {
  const books = getBooksFromLocal();
  const index = findBook(title, author, pages);
  if (index >= 0) { books.splice(index, 1); }
  localStorage.setItem('books', JSON.stringify(books));
}

function addBook(book) {
  const table = document.querySelector('#book-list');
  const row = document.createElement('tr');
  const {
    author, title, pages, read,
  } = book;

  row.innerHTML = `
    <td>${author}</td>
    <td>${title}</td>
    <td>${pages}</td>
    <td><button class ="btn btn-info read">${read}</button></td>
    <td><button class ="btn btn-danger delete">X</button></td>
  `;

  table.appendChild(row);
}

function displayBooks() {
  const myBookStore = getBooksFromLocal();

  myBookStore.forEach((book) => {
    addBook(book);
  });
}

function showMsg(msg, className){
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(msg));

  const header = document.querySelector('.container');
  const content = document.querySelector('.content');

  header.insertBefore(div, content);

  setTimeout(() => document.querySelector('.alert').remove(), 1000);

}

function formReset(){
  document.querySelector('#author').value = '';
  document.querySelector('#title').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#read').value = '';
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
  const read = (e.target.read.checked) ? 'Read' : 'Unread';

  if(author === '' || title === '' || pages === ''){
    showMsg('Please fill out the required fields', 'danger');
      
  }else{
    const book = new Book(author, title, pages, read);

    addBook(book);
    addBookToLocal(book);
    formReset();
    toggleClasses();
  }
});

document.getElementById('hidden').addEventListener('click', () => {
  toggleClasses();
});

document.getElementById('book-list').addEventListener('click', e => {
  const element = e.target;

  removeBook(element);

  if (element.classList.contains('delete')) {
    const pre = e.target.parentElement.previousElementSibling;
    const pages = pre.textContent;
    const title = pre.previousElementSibling.textContent;
    const author = pre.previousElementSibling.previousElementSibling.textContent;
    removeBookFromLocal(title, author, pages);
  }
});

document.getElementById('book-list').addEventListener('click', e => {
  const element = e.target;

  if (element.classList.contains('read')) {
    const pre = e.target.parentElement.previousElementSibling;
    const pages = pre.textContent;
    const title = pre.previousElementSibling.textContent;
    const author = pre.previousElementSibling.previousElementSibling.textContent;

    const books = getBooksFromLocal();
    const index = findBook(title, author, pages);

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
