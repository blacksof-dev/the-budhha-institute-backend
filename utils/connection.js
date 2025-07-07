const mongoose = require("mongoose");
require("dotenv").config(); 

connection()
  .then(() => {
    console.log("Database connection happened successfully");
  })
  .catch((error) => {
    console.log("Some error during connection:", error.message);
  });

async function connection() {
  await mongoose.connect(process.env.MONGODBURL);
}

module.exports = connection;
