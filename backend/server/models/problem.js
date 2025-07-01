
const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  difficulty:   { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  sampleInput:  { type: String, default: "" },  // 🔄 allow empty input
  sampleOutput: { type: String, required: true },
  testCases:    [
    {
      input:  { type: String, default: "" },     // 🔄 allow empty input in test case
      output: { type: String, required: true }
    }
  ],
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model("Problem", problemSchema);
