const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns"); dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;