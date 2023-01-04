const assert = require("assert");
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

const checkValuesMatch = async () => {
  // Connect to the Patients collection
  try {
    const checkData = await PatientsData.find();
    // Read the input data file

    JSON.parse(
      fs.readFileSync(`./_data/data.json`, "utf-8", (err, data) => {
        data.map((el) =>
          Object.fromEntries(
            Object.entries(el).map(([key, value]) => [
              key.toLowerCase().replace(/\s+/g, ""),
              value,
            ])
          )
        );
        // Split the file into lines
        const lines = data.split("\n");
        // Assert that the number of lines in the file matches the number of patients in the collection
        assert.equal(lines.length, patients.length);
        // Iterate over the lines and patients, and assert that the data matches

        lines.forEach((line, i) => {
          const parts = line.split(",");
          assert.equal(parts[0], patients[i].programidentifier);
          assert.equal(parts[1], patients[i].datasource);
          assert.equal(parts[2], patients[i].cardnumber);
          assert.equal(parts[2], patients[i].memberid);
          assert.equal(parts[2], patients[i].firstname);
          assert.equal(parts[2], patients[i].lastname);
          assert.equal(parts[2], patients[i].dateofbirth);
          assert.equal(parts[2], patients[i].address1);
          assert.equal(parts[2], patients[i].address2);
          assert.equal(parts[2], patients[i].city);
          assert.equal(parts[2], patients[i].state);
          assert.equal(parts[2], patients[i].telephonenumber);
          assert.equal(parts[2], patients[i].emailaddress);
          assert.equal(parts[2], patients[i].consent);
          assert.equal(parts[2], patients[i].mobilephone);
        });
      })
    );

    if (checkData) {
      console.log("All felids match in flat file and database".green.inverse);
      console.log("    ");
    }
  } catch (error) {
    console.log(error);
  }
};

const testForEmptyNameValue = async () => {
  // should print out all Patient IDs where the first name is missing
  try {
    const noNameValueCheck = await PatientsData.find({ firstname: "" });

    noNameValueCheck.forEach((patient) => {
      console.log(
        patient._id,
        "Found id that are missing firstname".green.inverse
      );
      console.log("  ");
    });
  } catch (error) {
    console.log(error, "somthing went wrong".red.inverse);
  }
};

const testForEmptyEmailValue = async () => {
  // should print out all Patient IDs where the first name is missing
  try {
    const noEmailValueCheck = await PatientsData.find({
      emailaddress: "",
      consent: "Y",
    });

    noEmailValueCheck.forEach((patient) => {
      console.log(
        patient._id,
        "Found ids for email address is missing, but consent is Y".green.inverse
      );
      console.log("  ");
    });
  } catch (error) {
    console.log(error, "somthing went wrong".red.inverse);
  }
};
// Check if emails are in the db collection
const verifyEmailsAreinCollection = async () => {
  try {
    const EmailValueCheck = await EmailData.find();

    if (EmailValueCheck) {
      console.log("Emails are in email collection".green.inverse);
      console.log("  ");
    }
  } catch (error) {
    console.log(error, "Error 500, emails are not in collection".red.inverse);
  }
};

const verifyEmailsAreinScheduled = async () => {
  try {
    const EmailScheduledCheck = await EmailData.find();

    EmailScheduledCheck.forEach((email) => {
      const people = [
        ["Found emails that are scheduled and date"],
        [],
        ["Name:", email.name],
        [],
        ["Scheduled Date:", email.scheduled_date],
      ];
      console.table(people);
    });
  } catch (error) {
    console.log(error, "Error 500, emails are not in collection".red.inverse);
  }
};

checkValuesMatch();

testForEmptyNameValue();

testForEmptyEmailValue();

verifyEmailsAreinCollection();

verifyEmailsAreinScheduled();
