const myLibrary = [];

function addToLibrary(book) {
  myLibrary[myLibrary.length] = book;
}

function removeFromLibrary(bookId) {
  const index = bookId - 1;
  const container = document.getElementById(`Book ${bookId}`);
  container.remove();
  myLibrary.splice(index, 1);
}

function displayBooks(library) {
  const grid = document.getElementById("library-grid");
  const readBook = "Already read";
  const notRead = "Yet to read";
  library.forEach((book, index) => {
    if (document.getElementById(`Book ${index + 1}`) === null) {
      const container = document.createElement("div");
      container.classList.add("cardContainer");
      container.setAttribute("id", `Book ${index + 1}`);
      grid.appendChild(container);

      const titleContainer = document.createElement("div");
      titleContainer.classList.add("titleContainer");

      const title = document.createElement("p"); // Limite: 30 caracteres
      title.setAttribute("id", "title");
      title.textContent = `"${book.title}"`;
      titleContainer.appendChild(title);
      const pages = document.createElement("p");
      pages.setAttribute("id", "pages");
      pages.textContent = `${book.pages} pages`;
      const author = document.createElement("p"); // Limite: 25 caracteres
      author.setAttribute("id", "author");
      author.textContent = `${book.author}`;
      const isRead = document.createElement("button");
      isRead.classList.add("cardBtn");
      if (book.isRead === "Yes") {
        isRead.setAttribute("id", "isReadBtn");
        isRead.textContent = readBook;
      } else {
        isRead.setAttribute("id", "isNotReadBtn");
        isRead.textContent = notRead;
      }
      isRead.addEventListener("click", (e) => {
        const button = e.target;
        if (button.textContent === "Already read") {
          button.setAttribute("id", "isNotReadBtn");
          button.textContent = notRead;
        } else if (button.textContent === "Yet to read") {
          button.setAttribute("id", "isReadBtn");
          button.textContent = readBook;
        }
      });

      const bookRemove = document.createElement("button");
      bookRemove.classList.add("cardButton");
      bookRemove.setAttribute("id", "removeBtn");
      bookRemove.classList.add("cardBtn");
      bookRemove.textContent = "Delete book";
      bookRemove.addEventListener("click", () => {
        const bookId = container.id.slice(-1);
        removeFromLibrary(bookId);
      });
      container.appendChild(titleContainer);
      container.appendChild(pages);
      container.appendChild(author);
      container.appendChild(isRead);
      container.appendChild(bookRemove);
    }
  });
}

const Book = function constructor(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function info() {
    return `${this.title} by ${this.author}, ${this.pages} pages,${this.isRead}`;
  };
};

const libraryGrid = document.getElementById("library-grid");
const form = document.getElementById("bookForm");
const addBookBtn = document.getElementById("addBookBtn");
const modal = document.querySelector(".modal");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const closeButton = document.querySelector(".close-button");

libraryGrid.appendChild(addBookBtn);

function clearForm() {
  const bookName = document.getElementById("bookTitle");
  const bookAuthor = document.getElementById("bookAuthor");
  const bookPages = document.getElementById("bookPages");
  const bookIsRead = document.getElementById("haveRead");

  bookName.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookIsRead.value = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

submitBtn.addEventListener("click", () => {
  const bookName = document.getElementById("bookTitle").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const bookPages = document.getElementById("bookPages").value;
  const bookIsRead = document.getElementById("haveRead").value;
  if (form.checkValidity() === true) {
    const book = new Book(bookName, bookAuthor, bookPages, bookIsRead);
    addToLibrary(book);
    displayBooks(myLibrary);
    libraryGrid.appendChild(addBookBtn);
    setTimeout(() => {
      clearForm(bookName, bookAuthor, bookPages, bookIsRead);
    }, 0.1);

    // clearForm(bookName, bookAuthor, bookPages, bookIsRead);
  }
});
clearBtn.addEventListener("click", () => {
  const bookName = document.getElementById("bookTitle");
  const bookAuthor = document.getElementById("bookAuthor");
  const bookPages = document.getElementById("bookPages");
  const bookIsRead = document.getElementById("haveRead");

  bookName.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookIsRead.value = "";
});

// Modal
function toggleModal() {
  addBookBtn.classList.toggle("add-button-disable-hover");
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

addBookBtn.addEventListener("click", () => {
  toggleModal();
});

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
// Fin modal
