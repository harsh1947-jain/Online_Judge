


const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");
const Problem = require("../models/problem");

// POST /submission → create a new submission


const authMiddleware = require("../middleware/auth"); // 👈 JWT middleware

// GET /mysubmissions → Get submissions for logged-in user
router.get("/mysubmissions", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await Submission.find({ user: userId })
      .populate("problem", "title") // To get problem title
      .sort({ createdAt: -1 }); // Sort by latest

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/submission", async (req, res) => {

    console.log("📦 Incoming submission payload:", req.body); 
  try {
    const { userId, problemTitle, code, language, verdict } = req.body;

    // Basic validation
    if (!userId || !problemTitle || !code || !language || !verdict) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const problem = await Problem.findOne({ title: problemTitle });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const submission = await Submission.create({
      user: userId,         // ✅ Add user field
      problem: problem._id,
      code,
      language,
      verdict,
    });

    return res.status(201).json({
      message: "Submission saved successfully",
      submissionId: submission._id,
    });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
