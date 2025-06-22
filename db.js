require('dotenv').config();
const mysql = require('mysql2');

let host = process.env.DB_HOST || '';
let port = 3306;  // default port

// If the host includes ":port", split it
if (host.includes(':')) {
  const parts = host.split(':');
  host = parts[0];
  port = parseInt(parts[1], 10);
}

const db = mysql.createConnection({
  host: host,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: port,
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;
