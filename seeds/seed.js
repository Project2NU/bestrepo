
const sequelize = require('../config/connection');
const { User, Book, Review, Post } = require('../models');

const userData = require('./userData.json');
const bookSeedData = require('./bookSeedData.json')
const postData =require("./postSeeds.json")
const reviewData = require("./reviewSeeds.json")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  
  // Review.sync({force:true});
  // User.sync({force:true});
  // Book.sync({force:true});


  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Book.bulkCreate(bookSeedData, {

    individualHooks: true,
    returning: true,
  });
   await Post.bulkCreate(postData, {
     individualHooks: true,
     returning: true,
   });
    await Review.bulkCreate(reviewData, {
      individualHooks: true,
      returning: true,
    });

  process.exit(0);
};

seedDatabase();
