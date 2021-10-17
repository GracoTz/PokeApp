const express = require('express');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const db = require('./db').connection;

const app = express();

// Middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

// Database
db.connect((err) => {
    if (err) throw err;
    console.log('Database Connected!');
});

// Routers
app.use(require('./routers'));

// Server
app.listen(PORT, HOST, () => {
    console.log(`Server ${HOST} listening on port ${PORT}`);
});