// assumes 'Post' is the model for posts and it includes a 'userId' foreign key
const express = require("express");
const router = express.Router();
// console.log("Dashboard router loaded");
const { User, Post, Comment, Review } = require("../../models");

router.get("/", async (req, res) => {
  console.log("Accessing  route");
  if (!req.session.logged_in) {
    res.redirect("/login"); // Redirect to login if not logged in
    return;
  }

  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    // serialize the data to send to the template
    const user = userData.get({ plain: true });

    res.render("dashboard", {
      posts: user.Posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route to create a new post
router.post("/", async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: "Please log in to create posts" });
    return;
  }

  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT route to update an existing post
router.put("/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: "Please log in to edit posts" });
    return;
  }

  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId, // Ensure the post belongs to the user
      },
    });

    if (updatedPost[0] === 0) {
      res.status(404).json({ message: "Post not found or user unauthorized" });
      return;
    }

    res.json({ message: "Post updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE route to delete a post
router.delete("/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: "Please log in to delete posts" });
    return;
  }

  try {
    const result = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId, // Ensure the post belongs to the user
      },
    });

    if (result === 0) {
      res.status(404).json({ message: "Post not found or user unauthorized" });
      return;
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route to add a comment to a post
router.post("/:id/comments", async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: "Please log in to comment on posts" });
    return;
  }

  try {
    const newComment = await Comment.create({
      postId: req.params.id,
      userId: req.session.userId,
      content: req.body.content,
    });

    res.json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route to fetch a single post details
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        userId: req.session.userId, // Ensure the post belongs to the user
      },
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  try {
    const reviewsData = await Review.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const reviews = reviewsData.map((review) => review.get({ plain: true }));

    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      posts: user.Posts,
      reviews: reviews, // Add reviews to the data sent to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// These routes assume we have Sequelize models named Post and Comment, and they must match our actual models. They also assume that we've set up the appropriate views for dashboard and postDetails.

// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class User extends Model {}

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "user",
//   }
// );

// module.exports = User;

// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class Post extends Model {}

// Post.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "post",
//   }
// );

// module.exports = Post;

// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class Comment extends Model {}

// Comment.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//     postId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "post",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "comment",
//   }
// );

// module.exports = Comment;

// const userData = [
//   {
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     password: "password123", // In practice, this should be hashed
//   },
//   {
//     name: "Bob Smith",
//     email: "bob@example.com",
//     password: "password123", // In practice, this should be hashed
//   },
// ];

// module.exports = userData;

// <!-- dashboard.handlebars -->
// {{#if logged_in}}
//   <h1>Dashboard</h1>
//   <div>
//     {{#each posts}}
//       <div class="post">
//         <h3>{{this.title}}</h3>
//         <p>{{this.content}}</p>
//         <!-- Add more details you want to show for each post -->
//       </div>
//     {{/each}}
//   </div>
// {{else}}
//   <p>You must be logged in to view this page.</p>
// {{/if}}
