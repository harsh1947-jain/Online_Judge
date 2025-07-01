
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// const { generateFile } = require("./generateFile");
// const { generateInputFile } = require("./generateInputFile");
// const { executeCpp } = require("./executeCpp");
// const Problem = require("../backend/server/models/problem");

// const app = express();
// dotenv.config();

// // Middleware
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Test Route
// app.get("/", (req, res) => {
//   res.json({ status: "Online Judge Server Running ✅" });
// });

// // Run Code Route
// app.post("/run", async (req, res) => {
//   const { language = "cpp", code, input } = req.body;

//   if (!code) {
//     return res.status(400).json({ success: false, error: "Empty code!" });
//   }

//   try {
//     const filePath = await generateFile(language, code);
//     const inputPath = await generateInputFile(input || "");
//     const output = await executeCpp(filePath, inputPath);
//     res.json({ filePath, inputPath, output });
//   } catch (error) {
//     res.status(500).json({ error: "Execution error: " + error.message });
//   }
// });



// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { generateFile } = require("./generateFile");
const { generateInputFile } = require("./generateInputFile");
const { executeCpp } = require("./executeCpp");
const Problem = require("../backend/server/models/problem");

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Home route
app.get("/", (req, res) => {
  res.json({ status: "Online Judge Server Running ✅" });
});

// Run code (custom input)
app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input || "");
    const output = await executeCpp(filePath, inputPath);
    res.json({ filePath, inputPath, output });
  } catch (error) {
    res.status(500).json({ error: "Execution error: " + error.message });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
