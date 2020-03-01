const express = require("express");
const sql = require("../database/connect").connection;
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static("./client/dist"));
app.use(bodyParser());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/cows", (req, res) => {
  sql.queryAsync("SELECT * FROM cows").then(result => {
    res.status(200);
    res.send(result);
  });
});

app.post("/api/cows", (req, res) => {
  console.log("BODY: ", req.body);
  let cowName = req.body.cowName;
  let cowDesc = req.body.cowDescription;
  sql.queryAsync("INSERT INTO cows(cowName, cowDescription) VALUES (?, ?)", [cowName, cowDesc]).then(result => {
    res.status(201);
    res.send("Created");
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
