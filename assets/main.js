import Store from './store.js';
import UI from './ui.js';

class Book {
  constructor(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks());

document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  const author = e.target.author.value;
  const title = e.target.title.value;
  const pages = e.target.pages.value;

  const book = new Book(author, title, pages);

  UI.addBook(book);
  Store.addBookToLocal(book);
  UI.toggleClasses();
});

document.getElementById('hidden').addEventListener('click', () => {
  UI.toggleClasses();
});

document.getElementById('book-list').addEventListener('click', e => {
  const element = e.target;

  UI.removeBook(element);

  if (element.classList.contains('delete')) {
    const pre = e.target.parentElement.previousElementSibling.previousElementSibling;
    const pages = pre.textContent;
    const title = pre.previousElementSibling.textContent;
    const author = pre.previousElementSibling.previousElementSibling.textContent;
    Store.removeBookFromLocal(title, author, pages);
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