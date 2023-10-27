const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'toor',
  database: 'parking_management'
})

module.exports = connection