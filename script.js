const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalSpan = document.querySelector(".close");
const bookForm = document.getElementById("book-form");
const booksContainer = document.getElementById("books-container");

const booksCollection = [];

bookForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let allValidation = true;
  let allData = {};
  ev.target.querySelectorAll("input").forEach((element, index) => {
    if (!validation(element)) allValidation = false;
    if (allValidation) allData[index] = { [element.name]: element.value };
  });

  if (allValidation)
    booksCollection.push(
      new createBook(
        allData[0].title.toUpperCase(),
        allData[1].author,
        allData[2].pages,
        false
      )
    );
  ev.target.reset();
  renderBook();
});

Array.from(bookForm).forEach((element) => {
  element.addEventListener("input", (event) => {
    validation(event.target);
  });
});

const validation = (data) => {
  const currentInput = data;
  if (!currentInput.checkValidity()) {
    currentInput.nextElementSibling.textContent =
      currentInput.validationMessage;
    currentInput.classList.add("error-input");
    return false;
  } else {
    currentInput.classList.remove("error-input");
    currentInput.nextElementSibling.textContent = "";
    return true;
  }
};

//constructor for creating book contents
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

//handles rendering elements and event handlers
class bookComponent {
  constructor(bookDetails, removeBookHandler, bookId) {
    this._bookDetails = bookDetails;
    this._bookId = bookId;
    this._removeBookHandler = removeBookHandler;
  }
  createElement(element, className, textContent = "") {
    const ele = document.createElement(element);
    if (className !== "") ele.classList = className;
    if (textContent !== "") ele.textContent = textContent;
    return ele;
  }
  renderElement() {
    const bookDiv = this.createElement("div", "book-div", "");

    const coverTop = this.createElement("div", "cover-top");
    const coverBottom = this.createElement("div", "cover-bottom");
    const author = this.createElement(
      "p",
      "",
      "By " + this._bookDetails.book.author
    );
    const title = this.createElement("h2", "", this._bookDetails.book.title);
    const pagesEle = this.createElement(
      "p",
      "",
      this._bookDetails.book.pages + "p"
    );
    const changeStatusEl = this.createElement(
      "button",
      this._bookDetails.book.status ? "completed" : "default",
      this._bookDetails.book.status ? "Completed" : "Mark as Completed"
    );
    const removeEl = this.createElement("button", "", "Remove");
    changeStatusEl.addEventListener("click", (ev) => {
      this.changeStatus();
    });

    removeEl.addEventListener("click", (ev) => {
      this._removeBookHandler(this._bookId);
    });
    coverTop.append(author, title, pagesEle);
    coverBottom.append(changeStatusEl, removeEl);
    bookDiv.append(coverTop, coverBottom);
    return bookDiv;
  }
  changeStatus() {
    this._bookDetails._status = !this._bookDetails._status;
    console.log(this.renderElement());
    this.renderElement();
  }
}
const renderBook = () => {
  booksContainer.textContent = "";
  booksCollection.forEach((val, key) => {
    const renderB = new bookComponent(val, removeBook, key);
    booksContainer.appendChild(renderB.renderElement());
  });
};
const changeStatus = (bookDetails) => {
  bookDetails._status = !bookDetails._status;
  renderBook();
};
const removeBook = (id) => {
  const confirmation = confirm("Are u sure?");
  if (confirmation) booksCollection.splice(id, 1);
  renderBook();
};

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
