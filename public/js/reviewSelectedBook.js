console.log('Script connected');
document
  .querySelector("#book-title")
  .addEventListener("blur", async (event) => {
    console.log("BLUR", event.target.value);
    const response = await fetch(
      "/api/books/title/" + event.target.value.trim()
    );
    const book = await response.json();
    if (book) {
      console.log(book);
      document.querySelector("#book-author").value = book.author;
      document.querySelector("#book-synopsis").value = book.synopsis;
      document.querySelector("#review-text").focus();
    } else {
      console.log("BOOK DOESN'T EXIST");
    }
  });

  const apiTitle = document.getElementById("title").textContent;
  console.log(apiTitle);
  const bookImage = document.getElementById('bookImg');
  let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${apiTitle}`
  
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Process the data returned by the API
      console.log(data); // This will log the book data to the console
      const imageUrl = data.items[0].volumeInfo.imageLinks.thumbnail
      bookImage.setAttribute("src", imageUrl);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

document
  .querySelector(".comment-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const bookTitle = document.getElementById("book-title").value;
    const bookAuthor = document.getElementById("book-author").value;
    const bookSynop = document.getElementById("book-synopsis").value;
    const reviewText = document.getElementById("review-text").value;

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookTitle,
          bookAuthor,
          bookSynop,
          reviewText,
        }),
      });

      if (!response.ok) {
        throw new Error("Response not OK");
      }

      const result = await response.json();
      console.log("Review Submitted");
      location.reload();
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("noo. failed to submit review.");
    }
  });

document.querySelector("#toggle-review").addEventListener("click", (event) => {
 
        let commentBox = document.querySelector(".comment-box")
        
        if (commentBox.style.display == "block"){
            commentBox.style.display = "none";
        } else {
            commentBox.style.display = "block"
        } 
        
  });