const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const reviewRoutes = require("./reviewRoutes");
const postRoutes = require("./dashboardRoutes");
const authRoutes = require("./authRoutes");

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/reviews", reviewRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);

module.exports = router;
