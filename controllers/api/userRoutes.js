const router = require("express").Router();
const { User } = require("../../models");
// /api/users/
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(function () {
      (req.session.userId = newUser.id),
        (req.session.name = newUser.name),
        (req.session.logged_in = true);
    });
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      // req.session.userId = userData.id;
      req.session.logged_in = true;
      req.session.userId = userData.id;
      req.session.name = userData.name;
      // console.log("WEEEEEEEEEAGAIN", userData.id)

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
