
const express = require("express");
const router = express.Router();

const homeRoutes = require("./homeRoutes");
const authRoutes = require("./authRoutes");
const problemRoutes=require("./problemRoutes");
const submissionRoutes = require("./submissionRoutes");
router.use("/", homeRoutes);
router.use("/", authRoutes);
router.use("/",problemRoutes);

router.use("/", submissionRoutes);

module.exports = router;
