const mongoose = require("mongoose");

module.exports = async function () {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });
  console.log("Connected to DB");
};
