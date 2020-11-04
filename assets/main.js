let myBookStore = []

function Book(author, title, pages){
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function addBookToStore(form) {
  let book = new Book(form.author.value, form.title.value, form.pages.value);
  myBookStore.push(book);
  console.log(myBookStore[0]);
}

function displayBook(){
  console.log(myBookStore);
}