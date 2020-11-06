import Store from './store.js';

export default class UI {
  static displayBooks() {
    const myBookStore = Store.getBooksFromLocal();

    myBookStore.forEach((book) => {
      UI.addBook(book);
    });
  }

  static addBook(book) {
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

  static removeBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  static toggleClasses() {
    document.getElementById('book-form').classList.toggle('d-none');
    document.getElementById('hidden').classList.toggle('d-none');
  }
}