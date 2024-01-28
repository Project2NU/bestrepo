document
  .getElementById("bookSearchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchQuery = document.getElementById("search-input").value;
    const resultsContainer = document.getElementById("searchResults");

    fetch(`/api/books/search?query=${encodeURIComponent(searchQuery)}`)
      .then((response) => response.json())
      .then((data) => {
        resultsContainer.innerHTML = ""; // Clear previous results

        if (data.docs && data.docs.length > 0) {
          data.docs.forEach((book) => {
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
          });
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
