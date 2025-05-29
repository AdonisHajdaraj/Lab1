const express = require('express');
const app = express();
const cors = require('cors');

const dhomat = require('./dhomat');
const login = require('./login');
const puntoret = require('./puntoret');
const menu = require('./menu');
const orari = require('./orari');
const rooms = require('./rooms');
const help = require('./help');

app.use(express.json());
app.use(cors());


app.use('/uploads', express.static('uploads')); 


app.use('/dhomat', dhomat);
app.use(login, );
app.use(puntoret );
app.use(menu );
app.use(orari );
app.use(rooms);
app.use(help);

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
