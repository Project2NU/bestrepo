const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

//all gets here
//gets that query the db and sends that data to specific handlebar pages
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });


    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage.handlebars', {
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

module.exports = router;
