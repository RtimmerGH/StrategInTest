require("dotenv").config();
const mongoose = require("mongoose");

async function connectDb() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URL);
  // eslint-disable-next-line no-console
  console.log("Db connecté!");
}

module.exports = {
  connectDb,
};
