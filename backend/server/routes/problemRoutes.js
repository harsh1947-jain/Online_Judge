

const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const { generateFile } = require("../../../compiler/generateFile");
const { generateInputFile } = require("../../../compiler/generateInputFile");
const { executeCpp } = require("../../../compiler/executeCpp");

// Add a new problem
router.post("/problems/add", async (req, res) => {
  try {
    const { title, description, difficulty, sampleInput, sampleOutput, testCases } = req.body;

    if (!title || !description || !difficulty || !sampleOutput || !testCases) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    const problemExists = await Problem.findOne({ title });
    if (problemExists) {
      return res.status(400).json({ success: false, message: "Problem already exists" });
    }

    const newProblem = new Problem({
      title,
      description,
      difficulty,
      sampleInput,
      sampleOutput,
      testCases,
    });

    await newProblem.save();

    res.status(201).json({ success: true, message: "Problem added successfully", problem: newProblem });
  } catch (err) {
    console.error("Error adding problem:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Submit endpoint
router.post("/submit/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const { code, language = "cpp" } = req.body;

    const problem = await Problem.findOne({ title });

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }

    const testCases = problem.testCases;
    let allPassed = true;
    const results = [];

    for (const testCase of testCases) {
      const filePath = await generateFile(language, code);
      const inputPath = await generateInputFile(testCase.input);
      const output = await executeCpp(filePath, inputPath);

      const expected = testCase.output.trim();
      const actual = output.trim();

      if (expected !== actual) {
        allPassed = false;
        results.push({ input: testCase.input, expected, actual, passed: false });
      } else {
        results.push({ input: testCase.input, expected, actual, passed: true });
      }
    }

    if (allPassed) {
      return res.json({ success: true, message: "✅ All test cases passed successfully." });
    } else {
      return res.json({ success: false, message: "❌ Some test cases failed.", results });
    }

  } catch (error) {
    console.error("Error in /submit/:title:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
