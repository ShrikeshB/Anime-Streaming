const mysql = require("mysql");
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"animeott"
});

module.exports = db;