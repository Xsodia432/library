const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalSpan = document.querySelector(".close");
const bookForm = document.getElementById("book-form");
const submitForm = document.getElementById("submit-form");
const booksContainer = document.getElementById("books-container");

const booksCollection = [];

function createBook(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.getBook = function () {
    return {
      title: this.title,
      author: this.author,
      pages: this.pages,
      status: false,
    };
  };
}

bookForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const title = ev.target.title.value;
  const author = ev.target.author.value;
  const pages = ev.target.pages.value;
  booksCollection.push(
    new createBook(title.toUpperCase(), author, pages, false)
  );
  ev.target.reset();
  renderBook();
});

const renderBook = () => {
  booksContainer.textContent = "";
  booksCollection.forEach((val, key) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList = "book-div";
    const coverTop = document.createElement("div");
    const coverBottom = document.createElement("div");
    coverTop.classList = "cover-top";
    coverBottom.classList = "cover-bottom";
    const title = document.createElement("h2");
    const pagesEle = document.createElement("p");
    const authorEle = document.createElement("p");
    const changeStatusEl = document.createElement("button");
    const removeEl = document.createElement("button");

    removeEl.addEventListener("click", () => {
      removeBook(key);
    });
    changeStatusEl.addEventListener("click", () => {
      changeStatus(key);
    });
    title.textContent = val.title;
    authorEle.textContent = `By ${val.author}`;
    pagesEle.textContent = `${val.pages} Pages`;
    removeEl.textContent = "Delete Book";
    changeStatusEl.textContent = val.status ? "Completed" : "Mark as Completed";
    changeStatusEl.classList = val.status ? "completed" : "default";
    coverTop.append(authorEle, title, pagesEle);
    coverBottom.append(changeStatusEl, removeEl);
    bookDiv.append(coverTop, coverBottom);
    booksContainer.appendChild(bookDiv);
  });
};
const changeStatus = (id) => {
  booksCollection[id].status = !booksCollection[id].status;

  renderBook();
};
const removeBook = (id) => {
  const confirmation = confirm("Are u sure?");
  if (confirmation) booksCollection.splice(id);
  renderBook();
};

renderBook();

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
