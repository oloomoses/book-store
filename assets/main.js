class Book{
  constructor(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
  }
};

class Store{
  static getBooksFromLocal() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  };

  static addBookToLocal(book) {
    const books = Store.getBooksFromLocal();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  };

  static removeBookFromLocal(title, author, pages) {
    const books = Store.getBooksFromLocal();

    books.forEach((b, index) => {
      if (b.title === title && b.author === author && b.pages === pages) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  };
}

class UI {
  static displayBooks() {
    const myBookStore = Store.getBooksFromLocal();

    myBookStore.forEach((book) => {
      UI.addBook(book);
    });
  };
  
  static addBook(book){
    let table = document.querySelector('#book-list');
    let row = document.createElement('tr');
  
    row.innerHTML = `
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td>${book.pages}</td>
      <td><button class ="btn btn-info read">Unread</btn></td>
      <td><button class ="btn btn-danger delete">X</btn></td>
    `;
  
    table.appendChild(row);
  };
  
  static removeBook(element) {
    if(element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  };
  
  static toggleClasses(){
    document.getElementById('book-form').classList.toggle('d-none');
    document.getElementById('hidden').classList.toggle('d-none');
  }
};

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

document.getElementById('hidden').addEventListener('click', e => {
  UI.toggleClasses();
});

document.getElementById('book-list').addEventListener('click', e => {
  element = e.target;

  UI.removeBook(element);

  if(element.classList.contains('delete')){
    const pre = e.target.parentElement.previousElementSibling.previousElementSibling;
    const pages = pre.textContent;
    const title = pre.previousElementSibling.textContent;
    const author = pre.previousElementSibling.previousElementSibling.textContent;
    Store.removeBookFromLocal(title, author, pages);
  }

});

document.getElementById('book-list').addEventListener('click', e => {
  element = e.target;

  if(element.classList.contains('read')){
    if(element.innerHTML === 'Unread'){
      element.innerHTML = 'Read';
    } else {
      element.innerHTML = 'Unread';
    }
  }
});