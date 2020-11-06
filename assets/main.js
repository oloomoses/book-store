let myBookStore = [
  {
    author: 'Author one',
    title: 'Book 1',
    pages: '300'
  },

  {
    author: 'Author two',
    title: 'Book 2',
    pages: '150'
  }
]

function Book(author, title, pages){
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function displayBooks() {
  myBookStore.forEach((book) => {
    addBook(book)
  });
}

function addBook(book){
  let table = document.querySelector('#book-list');
  let row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>${book.pages}</td>
    <td><a href = "" class = "btn btn-danger delete">X</a></td>
  `;

  table.appendChild(row);
}

document.addEventListener('DOMContentLoaded', displayBooks());