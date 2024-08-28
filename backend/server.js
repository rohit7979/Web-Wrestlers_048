const express = require("express");
const connectToDB = require("./src/configs/db");


require("dotenv").config();
const app = express();

const port = process.env.PORT || 9090;
const db_url = process.env.DB_URL;


app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("this is a home route");
});

app.listen(port, async () => {
    try {
      await connectToDB(db_url);  
      console.log('Successfully connected to the database');
      console.log(`Server is running at http://localhost:${port}`);
    } catch (err) {
      console.log(err);
      console.log("Error while connecting to the database");
    }
  });