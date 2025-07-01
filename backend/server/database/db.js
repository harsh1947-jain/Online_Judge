

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB:", error);
  }
};

module.exports = connectDb;

