const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');

const path = require('path');

app.use(cors());
app.use(express.json());




const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "hotel",
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.get("/dhomat", (req, res) => {
  db.query("SELECT * FROM dhomat", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/orari", (req, res) => {
  db.query("SELECT * FROM orari", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/puntoret", (req, res) => {
  db.query("SELECT * FROM puntoret", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/standarte", (req, res) => {
  db.query("SELECT * FROM standarte", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/vip", (req, res) => {
  db.query("SELECT * FROM vip", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/ekslusive", (req, res) => {
  db.query("SELECT * FROM ekslusive", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});
app.get("/suite", (req, res) => {
  db.query("SELECT * FROM suite", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/familjare", (req, res) => {
  db.query("SELECT * FROM familjare", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});
app.post("/dhomat", (req, res) => {
  const sql = "INSERT INTO dhomat (image, name, pershkrimi) VALUES (?, ?, ?)";
  const values = [
    req.body.image,
    req.body.name,
    req.body.pershkrimi
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.post("/orari", (req, res) => {
  const sql = "INSERT INTO orari (name, role, h , m , me , e , p) VALUES (?, ?, ? , ? , ? , ? , ?)";
  const values = [
    req.body.name,
    req.body.role,
    req.body.h,
    req.body.m,
    req.body.me,
    req.body.e,
    req.body.p
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.post("/puntoret", (req, res) => {
  const sql = "INSERT INTO puntoret (name, sname, role) VALUES (?, ?, ?)";
  const values = [
    req.body.name,
    req.body.sname,
    req.body.role
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.put("/dhomat/:id", (req, res) => {
  const { id } = req.params;
  const { name, pershkrimi, image } = req.body;
  const sql = "UPDATE dhomat SET name = ?, pershkrimi = ?, image = ? WHERE id = ?";
  const values = [name, pershkrimi, image, id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.put("/orari/:id", (req, res) => {
  const { id } = req.params;
  const { name, role, h , m , me ,e , p  } = req.body;
  const sql = "UPDATE orari SET name = ?, role = ?, h = ?, m = ? , me = ? , e = ?, p = ? WHERE id = ?";
  const values = [name, role, h,m,me,e,p ,id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.delete("/dhomat/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM dhomat WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting from database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.delete("/orari/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM orari WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting from database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.delete("/puntoret/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM puntoret WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting from database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.post("/users", (req, res) => {
  const sql = "INSERT INTO users (name, email, password, confirm) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.confirm
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).send("Internal Server Error");
    }
    return res.json(result);
  });
});


app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.listen(3008, () => {
  console.log("Server is listening on port 3008");
})
