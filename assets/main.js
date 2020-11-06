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
    <td><button class ="btn btn-info read">Unread</btn></td>
    <td><button class ="btn btn-danger delete">X</btn></td>
  `;

  table.appendChild(row);
}

function removeBook(element) {
  if(element.classList.contains("delete")) {
    element.parentElement.parentElement.remove();
  }
}

function toggleClasses(){
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

  toggleClasses();
});

document.getElementById('hidden').addEventListener('click', e => {
  toggleClasses();
});

document.getElementById('book-list').addEventListener('click', e => {
  removeBook(e.target);
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