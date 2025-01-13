const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");



const path = require('path');







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

app.use(express.json())
app.use(cors())


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

/*app.get("/orari", (req, res) => {
  db.query("SELECT * FROM orari", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});*/

/*app.get("/puntoret", (req, res) => {
  db.query("SELECT * FROM puntoret", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});*/

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

/*app.post("/orari", (req, res) => {
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
});*/

/*app.post("/puntoret", (req, res) => {
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
});*/

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

/*app.put("/orari/:id", (req, res) => {
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
});*/

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

/*app.delete("/orari/:id", (req, res) => {
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
});*/

/*app.delete("/puntoret/:id", (req, res) => {
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
});*/

app.post("/users", (req, res) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,  
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


app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND role = ?";
  
  db.query(sql, [email, role], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send("Internal Server Error");
    }

    if (result.length === 0) {
      // No user found with that email and role
      return res.status(400).json({ error: "User not found or role does not match" });
    }

    const user = result[0];

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // If the role is admin and everything is correct, respond with success
    if (user.role === 'admin') {
      res.json({ message: "Admin login successful", user: { id: user.id, name: user.name, email: user.email } });
    } else {
      res.status(403).json({ error: "Access denied. Admins only." });
    }
  });
});



app.get("/puntoret", (req, res) => {
  const q = "SELECT * FROM puntoret"
  db.query(q,(err, data)=>{
    if(err) return res.json(err)
      return res.json(data)
    })
})

app.post("/puntoret", (req, res)=> {
  const q = "INSERT INTO puntoret (`name`, `sname`, `role`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.sname,
    req.body.role,
  ];
  db.query(q, [values], (err, data)=>{
    if(err) return res.json(err);
      return res.json("Eshte krijuar me sukses");
  });
});


app.delete("/puntoret/:id", (req, res)=>{
  const puntoriId = req.params.id;
  const q = "DELETE FROM puntoret WHERE id = ?";

  db.query(q, [puntoriId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte fshire me sukses")
  });
});


app.put("/puntoret/:id", (req, res)=>{
  const puntoriId = req.params.id;
  const q = "UPDATE puntoret Set `name` = ?, `sname` = ?, `role` = ? WHERE id = ?";

  const values=[
    req.body.name,
    req.body.sname,
    req.body.role,
  ]

  db.query(q, [...values,puntoriId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte ndryshuar me sukses")
  })
})

//menu
app.get("/menu", (req, res) => {
  const q = "SELECT * FROM menu"
  db.query(q,(err, data)=>{
    if(err) return res.json(err)
      return res.json(data)
    })
})

app.post("/menu", (req, res)=> {
  const q = "INSERT INTO menu (`name`, `price`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
  ];
  db.query(q, [values], (err, data)=>{
    if(err) return res.json(err);
      return res.json("Eshte krijuar me sukses");
  });
});

app.delete("/menu/:id", (req, res)=>{
  const ushqimiId = req.params.id;
  const q = "DELETE FROM menu WHERE id = ?";

  db.query(q, [ushqimiId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte fshire me sukses")
  });
});

app.put("/menu/:id", (req, res)=>{
  const ushqimiId = req.params.id;
  const q = "UPDATE menu Set `name` = ?, `price` = ? WHERE id = ?";

  const values=[
    req.body.name,
    req.body.price,
  ]

  db.query(q, [...values,ushqimiId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte ndryshuar me sukses")
  })
})


//orari
app.get("/orari", (req, res) => {
  const q = "SELECT * FROM orari"
  db.query(q,(err, data)=>{
    if(err) return res.json(err)
      return res.json(data)
    })
})

app.post("/orari", (req, res)=> {
  const q = "INSERT INTO orari(`name`, `role`, `h`, `m`, `me`, `e`, `p`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.role,
    req.body.h,
    req.body.m,
    req.body.me,
    req.body.e,
    req.body.p,
  ];
  db.query(q, [values], (err, data)=>{
    if(err) return res.json(err);
      return res.json("Eshte krijuar me sukses");
  });
});

app.delete("/orari/:id", (req, res)=>{
  const orariId = req.params.id;
  const q = "DELETE FROM orari WHERE id = ?";

  db.query(q, [orariId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte fshire me sukses")
  });
});

app.put("/orari/:id", (req, res)=>{
  const orariId = req.params.id;
  const q = "UPDATE orari Set `name` = ?, `role` = ?, `h` = ?, `m` = ?, `me` = ?, `e` = ?, `p` = ? WHERE id = ?";

  const values=[
    req.body.name,
    req.body.role,
    req.body.h,
    req.body.m,
    req.body.me,
    req.body.e,
    req.body.p,
  ]

  db.query(q, [...values,orariId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte ndryshuar me sukses")
  })
})


app.listen(3008, () => {
  console.log("Server is listening on port 3008");
})
