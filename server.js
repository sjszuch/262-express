const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// SQL Server connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sjszuch',
  password: 'password',
  database: 'cmps262'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});


app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM  cheese_inventory';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});