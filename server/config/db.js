const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDb;
