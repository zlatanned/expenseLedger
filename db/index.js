const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

mongoose.Promise = require("bluebird");

module.exports = {
  connect() {
    return mongoose
      .connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Successfully connected to the database"))
      .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
      });
  }
};
