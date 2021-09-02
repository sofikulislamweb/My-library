/* Search area start here  */
const noResultDiv = document.getElementById('error-div');
const bookInput = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';
    if (searchText === '') {
        const erroDiv = document.getElementById('error-div');
        erroDiv.textContent = '';
        const myBooks = document.getElementById('books-result');
        myBooks.textContent = '';
        const totalFound = document.getElementById('total-books');
        totalFound.textContent = '';
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card-body">
            <h5 class="text-center card-title text-danger">Your search field  empty</h5>
        </div>
        `
        erroDiv.appendChild(newDiv);
        return;
    }

    else {
        const url = ` https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => bookResult(data))
    }
}

/* Book result output */

const bookResult = books => {

    if (books.numFound === 0) {
        noResultDiv.innerHTML = `<h5 class="text-center card-title text-danger">No result found</h5>`
        const totalFound = document.getElementById('total-books');
        totalFound.textContent = '';
        const myBooks = document.getElementById('books-result');
        myBooks.textContent = '';
        return;
    }
    else {
        noResultDiv.textContent = '';

    }

    const totalFound = document.getElementById('total-books');
    totalFound.innerHTML = `<h3 class="text-center text-info">Total result found :-${books.numFound}</h3>`;
    const allBooks = books.docs;
    const myBooks = document.getElementById('books-result');
    myBooks.textContent = '';
    const erroDiv = document.getElementById('error-div');
    erroDiv.textContent = '';
    allBooks.forEach(book => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('g-4')
        newDiv.innerHTML = `
                <div class="col card py-4">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?images/default" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="text-success">${book.title}</h5>
                    <p class="text-primary">Author:${book.author_name ? book.author_name : 'no found'}</p>
                    <p class="text-dark">Publisher:${book.publisher}</p>
                    <p>${book.first_publish_year}</p>
                </div>
            </div>
        `
        myBooks.appendChild(newDiv)
    })
}
