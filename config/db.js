const mongoose = require("mongoose");
// Deprecation Warning suppressed
mongoose.set("strictQuery", false);
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDb Connected ${conn.connection.host}`.cyan.underline.bold);
};
module.exports = connectDB;
