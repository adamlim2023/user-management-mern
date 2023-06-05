const sqlite3 = require('sqlite3');
const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(bodyparser.json());

const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
  console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('./db/user_database.db', (err) => {
  if (err) {
    console.error("Erro opening database " + err.message);
  } else {

    db.run('CREATE TABLE users( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            name NVARCHAR(100)  NOT NULL,\
            email NVARCHAR(100)  NOT NULL,\
            gender NVARCHAR(100),\
            birthday NVARCHAR(100)\
        )', (err) => {
      if (err) {
        console.log("Table already exists.");
      }
    });
  }
});


app.get("/users", (req, res, next) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({ rows });
  });
});

app.post("/users/", (req, res, next) => {
  var { name, email, gender, birthday } = req.body;
  db.run(`INSERT INTO users (name, email, gender, birthday) VALUES (?,?,?,?)`, [name, email, gender, birthday],
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.status(201).json({
        "id": this.lastID
      })
    });
});

app.patch("/users/", (req, res, next) => {
  var { id, name, email, gender, birthday } = req.body;
  db.run(`UPDATE users set name = ?, email = ?, gender = ?, birthday = ? WHERE id = ?`,
    [name, email, gender, birthday, id],
    function (err, result) {
      if (err) {
        res.status(400).json({ "error": res.message })
        return;
      }
      res.status(200).json({ id: this.changes });
    });
});

app.delete("/users/:id", (req, res, next) => {
  db.run(`DELETE FROM users WHERE id = ?`,
    req.params.id,
    function (err) {
      if (err) {
        res.status(400).json({ "error": res.message })
        return;
      }
      res.status(200).json({ id: this.changes })
    });
});