const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const reviewRoutes = require("./reviewRoutes");
const postRoutes = require("./dashboardRoutes");

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/reviews", reviewRoutes);
router.use("/posts", postRoutes);

module.exports = router;
