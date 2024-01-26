const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

//all gets here
//gets that query the db and sends that data to specific handlebar pages
router.get("/", async (req, res) => {
  console.log("made in homeroutes");
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage.handlebars", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// /api/books/library
router.get("/library", async (req, res)=> {

  console.log('Request for library.')
      try {  
        const booksData = await Book.findAll();
        
        const books = booksData.map((book) => book.get({ plain: true }));
        
        res.render('library', { books });
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
      }
    
  });

router.get("/dashboard",  withAuth, async (req, res) => {
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

    console.log(reviews) //reviews is an array

    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
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



module.exports = router;
