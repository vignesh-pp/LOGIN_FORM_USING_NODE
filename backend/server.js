const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

//db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email`= ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json(err);
    }
    console.log(data);
    if (data.length > 0) {
      return res.json("SUCCESS");
    } else {
      return res.json("FAILURE");
    }
  });
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/forgotpassword", (req, res) => {
  console.log(res);
  console.log(req);
  const sql = "UPDATE login SET `password`= ? WHERE email = ?";
  db.query(sql, [req.body.password, req.body.email], (err, data) => {
    if (err) {
      return res.json(err);
    }
    alert(data)
    return res.json(data);
  });
});

app.listen(8001, () => {
  console.log("listening");
});
