const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const SimpleCrypto = require("simple-crypto-js").default;

const port = process.env.port || 3000;
const app = express();
app.use(cors());

const secretKey = "Sup3r-$ecr3t-KEY";
const simpleCrypto = new SimpleCrypto(secretKey);

var connection = mysql.createConnection({
  host: "sql9.freemysqlhosting.net",
  user: "sql9373666",
  password: "lPvCeSaDJ5",
  database: "sql9373666",
});

function encryptPassword(password) {
  const cipherPass = simpleCrypto.encrypt(password);
  return cipherPass;
}

function transformDate(date) {
  date = date || new Date();
  return date.toISOString().split("T")[0];
}

app.use("/", express.static("public"));

app.get("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  const pwd = encryptPassword(password);
  const date = transformDate(new Date());
  connection.connect();
  connection.query(
    'INSERT INTO user VALUES ("", ?, ?, ?)',
    [username, pwd, date],
    function (error, results, fields) {
      connection.end();
      if (error) throw error;
      res.json({ response: "success" });
    }
  );
});

app.get("/fullBudgetInfo", async (req, res) => {
  connection.connect();
  connection.query("SELECT * FROM budget", function (error, results, fields) {
    connection.end();
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
