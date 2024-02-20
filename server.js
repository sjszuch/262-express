const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Queries for mysql

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

app.post('/postreq', (req, res) => {
  var cheeseName = req.body.cheeseName;
  var inventoryQuantity = req.body.inventoryQuantity;
  var orderPrice = req.body.orderPrice;
  var msrp = req.body.msrp;


  db.query('INSERT INTO cheese_inventory (cheese_name, inventory_quantity, order_price, msrp) VALUES (?, ?, ?, ?)', [cheeseName, inventoryQuantity, orderPrice, msrp], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Values Inserted");
      res.send("Values Inserted");
    }
  });
});

app.post('/postzero', (req, res) => {
  var cheeseName = req.body.cheeseName;
  var inventoryQuantity = "0";
  var orderPrice = "0";
  var msrp = "0";


  db.query('INSERT INTO cheese_inventory (cheese_name, inventory_quantity, order_price, msrp) VALUES (?, ?, ?, ?)', [cheeseName, inventoryQuantity, orderPrice, msrp], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Values Inserted");
      res.send("Values Inserted");
    }
  });
});

app.get('/filterinventory', (req, res) => {
  var inventory = req.query.inventory;
  var filterQuery = 'SELECT * FROM cheese_inventory WHERE inventory_quantity < ?';

  db.query(filterQuery, [inventory], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.put('/updateinventory', (req, res) => {
  var id = req.body.id;
  var inventoryQuantity = req.body.inventoryQuantity;

  db.query('UPDATE cheese_inventory SET inventory_quantity = ? WHERE cheese_id = ?', [inventoryQuantity, id], (err, result) => {
    if (err) throw err;
    res.send("Inventory Updated");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});