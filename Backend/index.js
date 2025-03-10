const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const dhomat = require('./dhomat');
const login = require('./login');
const rezervimet = require('./rezervimet');
const puntoret = require('./puntoret');
const menu = require('./menu');
const orari = require('./orari');
const rooms = require('./rooms');



const path = require('path');


const secretKey = 'my_secret_key';

app.use(express.json())
app.use(cors())

const db = require('./db');

app.use(dhomat);
app.use(login);
app.use(rezervimet);
app.use(puntoret);
app.use(menu);
app.use(orari);
app.use(rooms);



app.listen(3008, () => {
  console.log("Server is listening on port 3008");
})








