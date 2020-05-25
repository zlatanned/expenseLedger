const express = require("express");
const DB = require("./db/index");

const app = express();
// parse application/json
app.use(express.json());
const port = 3061;

require('./routes/create.rest')(app);
require('./routes/read.rest')(app);
require('./routes/update.rest')(app);
require('./routes/delete.rest')(app);

app.get("/", function (req, res) {
  res.send("Welcome to the Landing Page");
});

DB.connect()
  .then((res) => {
    console.log("DB Connected");

    app.listen(port, (err) => {
      if (err) {
        console.log(`Error Creating Server ${err}`);
      } else {
        console.log(
          `Let's begin developing the most easy note-taking app ever :) at port ${port}`
        );
      }
    });
  })
  .catch((err) => {
    console.log("Error connecting to db");
  });
