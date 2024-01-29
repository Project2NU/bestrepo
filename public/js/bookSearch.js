// matches the id of the form containing the input tag
const form = document.getElementById("book-search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // get value from the textbox
  const searchQuery = document.getElementById("book-search-textbox").value;
  // figure out where to put this <div id = "search-results" on the page
  const resultsContainer = document.getElementById("search-results");

  fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      searchQuery
    )}&fields=cover_i,key,title,author_name`
  )
    // fetch(`/api/books/search?query=${encodeURIComponent(searchQuery)}`)
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = ""; // Clear previous results

      if (data.docs && data.docs.length > 0) {
        for (const book of data.docs) {
          // figure out how to style each in the html
          const bookElement = document.createElement("div");
          bookElement.className = "book-item";

          const titleElement = document.createElement("h3");
          titleElement.textContent = book.title;
          bookElement.appendChild(titleElement);

          const authorElement = document.createElement("p");
          authorElement.textContent = `Author: ${
            book.author_name ? book.author_name.join(", ") : "Unknown"
          }`;
          bookElement.appendChild(authorElement);

          resultsContainer.appendChild(bookElement);
        }
      } else {
        const noResultsElement = document.createElement("p");
        noResultsElement.textContent = "No results found.";
        resultsContainer.appendChild(noResultsElement);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      const errorElement = document.createElement("p");
      errorElement.textContent = "Error fetching search results.";
      resultsContainer.appendChild(errorElement);
    });
});
