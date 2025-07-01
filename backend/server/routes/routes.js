
const express = require("express");
const router = express.Router();

const homeRoutes = require("./homeRoutes");
const authRoutes = require("./authRoutes");
const problemRoutes=require("./problemRoutes")
router.use("/", homeRoutes);
router.use("/", authRoutes);
router.use("/",problemRoutes);

module.exports = router;
