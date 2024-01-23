const router = require("express").Router();
const { User, Book, Review } = require("../../models");

router.post("/", async (req, res) => {
  console.log("received new review data:", req.body);
  try {
    // new object combining req.body and the userId from the session
    const reviewData = {
      ...req.body,
      //   userId: req.session.userId,
    };

    //  new review with the combined data
    const newReview = await Review.create(reviewData);

    // Send back a response
    res.send(`You created a review: ${JSON.stringify(newReview)}`);
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
