const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

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

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/dashboard", (req, res) => {
  // get id of current user from session
  // get reviews where userId matches user.id
  // map data to {plain: true}
  // send list of review to dashboard view

  res.render("dashboard");
});

module.exports = router;
