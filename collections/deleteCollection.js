const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);
dotenv.config({ path: "./config/config.env" });

// import patients model
const PatientsData = require("../models/Patient");
const EmailData = require("../models/Email");

// connect to mongo db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Delete data from db
const deleteData = async () => {
  try {
    await PatientsData.deleteMany();
    await EmailData.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
}
