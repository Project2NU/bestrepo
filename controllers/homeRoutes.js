const router = require("express").Router();
const { User, Review, Post, Book } = require("../models");
const withAuth = require("../utils/auth");

//all gets here
//gets that query the db and sends that data to specific handlebar pages
router.get("/", async (req, res) => {
  console.log("made in homeroutes", req.session.logged_in);
  const dbReviews = await Review.findAll({
    include: [Book, User],
  });
  const reviews = dbReviews.map((review) => review.get({ plain: true }));
  console.log(reviews);
  try {
    res.render("homepage.handlebars", {
      logged_in: req.session.logged_in,
      reviews,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// /library
router.get("/library", async (req, res) => {
  console.log("Request for library.");
  try {
    const booksData = await Book.findAll();

    const books = booksData.map((book) => book.get({ plain: true }));

    res.render("library", { books });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// /reviews/:book_id
router.get("/reviews/:book_id", async (req, res) => {
  console.log("Request for library.");
  try {
    const reviewData = await Review.findAll(
      {
        include: Book, 
        where: {
          book_id: req.params.book_id
        }
      }
    );
    
    const review = reviewData.map((review) => review.get({ plain: true }));

    // const bookData = await Book.findByPk(
    //   {
    //     where: {
    //       id: req.params.book_id
    //     }
    //   }
    // )

    // const book = bookData.map((book) => review.get({ plain: true }));

    res.status(200).render("bookreviews", { review });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  // get id of current user from session
  // get reviews where userId matches user.id
  // map data to {plain: true}
  // send list of review to dashboard view

  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  try {
    const reviewsData = await Review.findAll({
      where: {
        //changed from user_id
        user_id: req.session.userId,
      },
    });

    const reviews = reviewsData.map((review) => review.get({ plain: true }));

    console.log(reviews); //reviews is an array

    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render("dashboard", {
      user,
      reviews, // Add reviews to the data sent to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//render for book views
//render for select book by id



module.exports = router;
