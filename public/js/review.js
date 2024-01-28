document
  .getElementById("reviewForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const bookId = document.getElementById("bookSelect").value;
    const reviewText = document.getElementById("reviewText").value;

    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: bookId,
          description: reviewText,
          // user_id is not included here. it should be set from the session on the server side?
        }),
      });

      if (!response.ok) {
        throw new Error("Response not OK");
      }

      const result = await response.json();
      console.log(result);
      alert("sick review submission success!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("noo. failed to submit review.");
    }
  });
