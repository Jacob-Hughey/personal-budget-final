const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const firebase = require("firebase/app");
require("firebase/auth");
const config = require("./config.json");
const fs = require("fs");

const port = process.env.port || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var firebaseConfig = {
  apiKey: "AIzaSyDbNy5s6LcPcN5T49UXvIKJaJVwN5iVGkw",
  authDomain: "personal-budget-adeac.firebaseapp.com",
  databaseURL: "https://personal-budget-adeac.firebaseio.com",
  projectId: "personal-budget-adeac",
  storageBucket: "personal-budget-adeac.appspot.com",
  messagingSenderId: "588557465654",
  appId: "1:588557465654:web:00dafe9c01610937b28097",
};
firebase.initializeApp(firebaseConfig);

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  ssl: {
    ca: fs.readFileSync(config.ssl.ca),
    key: fs.readFileSync(config.ssl.key),
    cert: fs.readFileSync(config.ssl.cert),
  },
});

app.use("/", express.static("public"));

app.get("/api/test", async (req, res) => {
  res.status(200).json({ response: "hey it worked" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      res.status(200).json({ response: "success" });
    })
    .catch(() => {
      res.status(400).json({ response: "Invalid login information." });
    });
});

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      res.status(200).json({ response: "success" });
    })
    .catch((error) => {
      res.status(400).json({
        response: `Error code: ${error.code}, Error message: ${error.message}`,
      });
    });
});

app.get("/api/logout", async (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.status(200).json({ response: "success" });
    })
    .catch((error) => {
      res.status(400).json({ response: "error" });
    });
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
