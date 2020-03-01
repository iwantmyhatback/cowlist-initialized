var mysql = require("mysql");
var Promise = require("bluebird");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hackreactor",
  password: "password",
  database: "cowlist"
});

connection.connect(error => {
  if (error) {
    console.error("CONNECTION ERROR: " + error.stack);
    // throw error;
  } else {
    console.log("CONNECTION SUCCESSFUL (threadId): " + connection.threadId);
  }
});

connection.queryAsync = Promise.promisify(connection.query);

exports.connection = connection;
