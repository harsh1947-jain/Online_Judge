
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",            // 👈 references User collection
    required: true
  },
  code: String,
  language: {
    type: String,
    enum: ["python", "cpp", "java"]
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Wrong Answer", "Error"],
    default: "Pending"
  },
  score: Number,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Submission", submissionSchema);
