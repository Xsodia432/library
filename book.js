const myLibary = [
  {
    title: "Lord of the Rings",
    author: "J.R.R Tolkin",
    pages: "269",
    status: false,
  },
];
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalSpan = document.querySelector(".close");
const submitForm = document.getElementById("book-form");
const booksContainer = document.getElementById("books-container");

function book() {
  booksContainer.innerHTML = ""; // Clear the container before appending new data

  myLibary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
    
      <h3>${book.title} </h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages} pages</p>
      <p>Status: ${book.status ? "Read" : "Not Read"}</p>
      
      <button onClick="changeStatus(${index})" 
    }">${book.status ? "Mark as unread" : "Mark as read"}</button>

    <button onClick="removeBook(${index})" style="background-color:red"
    }">Remove Book</button>
    `;
    booksContainer.appendChild(bookDiv);
  });
}
function addToLibrary(data) {
  data.status = false;
  myLibary.push(data);
  book();
}
function changeStatus(index) {
  myLibary[index].status = !myLibary[index].status;
  book();
}
function removeBook(index) {
  const isRemove = confirm("Are you sure you want to remove this book?");
  if (!isRemove) return;
  myLibary.splice(index, 1);
  book();
}
book();
submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(submitForm);
  const book = Object.fromEntries(formData.entries());
  addToLibrary(book);
  submitForm.reset();
});

openModalBtn.onclick = function () {
  modal.style.display = "block";
};

closeModalSpan.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
