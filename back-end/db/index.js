const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

module.exports = {
  connect() {
    return mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Successfully connected to the database"))
      .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
      });
  }
};
