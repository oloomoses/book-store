let myBookStore = []

function Book(author, title, pages){
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function addBookToStore(){
  let btn = document.querySelector('button');
  btn.onclick(prompt ('Enter book title'));
  
}

function displayBook(){

}