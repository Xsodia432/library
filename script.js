const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalSpan = document.querySelector(".close");
const bookForm = document.getElementById("book-form");
const submitForm = document.getElementById("submit-form");
const booksContainer = document.getElementById("books-container");

const booksCollection = [];

class createBook {
  constructor(title, author, pages, status) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._status = status;
  }
  set book({ title, author, pages, status }) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._status = status;
  }
  get book() {
    return {
      title: this._title,
      author: this._author,
      pages: this._pages,
      status: this._status,
    };
  }
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
    title.textContent = val._title;
    authorEle.textContent = `By ${val._author}`;
    pagesEle.textContent = `${val._pages} Pages`;
    removeEl.textContent = "Delete Book";
    changeStatusEl.textContent = val._status
      ? "Completed"
      : "Mark as Completed";
    changeStatusEl.classList = val._status ? "completed" : "default";
    coverTop.append(authorEle, title, pagesEle);
    coverBottom.append(changeStatusEl, removeEl);
    bookDiv.append(coverTop, coverBottom);
    booksContainer.appendChild(bookDiv);
  });
};
const changeStatus = (id) => {
  booksCollection[id]._status = !booksCollection[id]._status;

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
