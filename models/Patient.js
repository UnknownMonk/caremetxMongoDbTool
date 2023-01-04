const mongoose = require("mongoose");

const PatientsSchema = new mongoose.Schema({
  programidentifier: Number,
  datasource: String,
  cardnumber: Number,
  memberid: Number,
  firstname: String,
  lastname: String,
  dateofbirth: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zipcode: Number,
  telephonenumber: String,
  emailaddress: String,
  consent: String,
  mobilephone: Number,
});

module.exports = mongoose.model("PatientsData", PatientsSchema);
