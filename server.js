const mysql = require('mysql');

const con = mysql.createConnection({
  host: "vmedu173.mtacloud.co.il",
  database: "sadna",
  user: "root",
  password: "Sadna20181!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
;
