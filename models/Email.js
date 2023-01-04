const mongoose = require("mongoose");
// id, name, and scheduled_date.
const emailSchema = new mongoose.Schema({
  id: String,
  lastname: String,
  name: String,
  scheduled_date: Date,
});

module.exports = mongoose.model("Email", emailSchema);
