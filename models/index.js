const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");



Book.hasMany(Review, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
});

User.hasMany(Review, {
    foreignKey: 'user_id',
})

Review.belongsTo(Book, {
    foreignKey: 'book_id'
})


module.exports = { User, Book, Review };

