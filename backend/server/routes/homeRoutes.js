const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.status(200).json({
    message: " Welcome to OJ Platform!",
    prompt: "Please login or register to continue."
  });
});

module.exports = router;
