const router = require("express").Router();
const { User, Book, Review } = require("../../models");

router.post("/", async (req, res) => {
  console.log("received new review data:", req.body);
  try {
    // see if book already exists.
    let bookId;
    const existingBook = await Book.findOne({
      where: { title: req.body.bookTitle },
    });
    // If it does, use that as bookID
    if (existingBook) {
      bookId = existingBook.id;
    } else {
      // Else, create a new book record
      const newBook = await Book.create({
        title: req.body.bookTitle,
        author: req.body.bookAuthor,
        synopsis: req.body.bookSynop,
      });
      bookId = newBook.id;
    }

    const newReview = await Review.create({
      book_id: bookId,
      user_id: req.session.userId,
      description: req.body.reviewText,
    });

    console.log(newReview);
    res.json(newReview);
  } catch (error) {
    // Log the error to the console
    console.error("Error occurred: ", error);

    // Error handling in case disaster
    res.status(500).send("Error occurred while creating a review.");
  }
});

router.delete("/:id", async (req, res) => {
  const reviewId = req.params.id;
  const result = await Review.destroy({
    where: { id: reviewId },
  });

  if (result === 0) {
    // If no rows are deleted, it means the review wasn't found
    res.status(404).send(`Review with ID ${reviewId} not found.`);
  } else {
    // If the review is successfully deleted
    res.send(`You deleted a review with ID ${reviewId}.`);
  }
});

module.exports = router;
