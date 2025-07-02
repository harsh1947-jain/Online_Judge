// const mongoose = require("mongoose");

// const submissionSchema = new mongoose.Schema({
//   problem: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Problem",
//     required: true
//   },
//   code: {
//     type: String,
//     required: true
//   },
//   language: {
//     type: String,
//     required: true
//   },
//   verdict: {
//     type: String,
//     enum: ["Accepted", "Wrong Answer", "Compilation Error", "Runtime Error", "Time Limit Exceeded"],
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Submission", submissionSchema);


const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to the User model
    required: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  verdict: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Compilation Error", "Runtime Error", "Time Limit Exceeded"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Submission", submissionSchema);
