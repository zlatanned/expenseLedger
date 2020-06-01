const express = require("express");
const DB = require("./db/index");
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
require('dotenv').config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
const port = 3061;

require('./routes/expenses.rest')(app);
require('./routes/users.rest')(app);

app.get("/", function (req, res) {
  res.send("Welcome to the Landing Page");
});


DB.connect()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log(`Error Creating Server ${err}`);
      } else {
        console.log(
          `Let's begin developing the most easy expense-tracker app ever :) at port ${port}`
        );
      }
    });
  })
  .catch((err) => {
    console.log("Error connecting to db", err);
  });
