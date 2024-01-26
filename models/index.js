const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");
const Post = require("./Post");

Book.hasMany(Review, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

User.hasMany(Review, {
  foreignKey: "user_id",
});

Review.belongsTo(Book, {
  foreignKey: "book_id",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

// added this
User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "cascade",
});
Post.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = { User, Book, Review, Post };
