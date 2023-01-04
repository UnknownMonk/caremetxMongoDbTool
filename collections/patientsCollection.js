const colors = require("colors");
const fs = require("fs");
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

// Read and parse patients data
const parsePatients = JSON.parse(fs.readFileSync(`./_data/data.json`, "utf-8"));

// clean and lowercase data from json file

const patients = parsePatients.map((el) =>
  Object.fromEntries(
    Object.entries(el).map(([key, value]) => [
      key.toLowerCase().replace(/\s+/g, ""),
      value,
    ])
  )
);

// import data to db
const importData = async () => {
  try {
    // inserts patientsData
    await PatientsData.create(patients);
    // get patient data that gives consent from db
    const patientsConsent = await PatientsData.find({ consent: "Y" });

    // schedule emails
    const scheduledEmails1 = patientsConsent.map((patient) => {
      let date = new Date();
      return {
        lastname: patient.lastname,
        name: "Day 1",
        scheduled_date: date.setDate(date.getDate() + 1),
      };
    });

    const scheduledEmails2 = patientsConsent.map((patient) => {
      let date = new Date();

      return {
        lastname: patient.lastname,
        name: "Day 2",
        scheduled_date: date.setDate(date.getDate() + 2),
      };
    });

    const scheduledEmails3 = patientsConsent.map((patient) => {
      let date = new Date();

      return {
        lastname: patient.lastname,
        name: "Day 3",
        scheduled_date: date.setDate(date.getDate() + 3),
      };
    });

    const scheduledEmails4 = patientsConsent.map((patient) => {
      let date = new Date();
      return {
        lastname: patient.lastname,
        name: "Day 4",
        scheduled_date: date.setDate(date.getDate() + 4),
      };
    });

    // put emails in email collection
    await EmailData.create(scheduledEmails1);
    await EmailData.create(scheduledEmails2);
    await EmailData.create(scheduledEmails3);
    await EmailData.create(scheduledEmails4);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

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

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
