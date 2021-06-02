const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@admin25",
    database: "nodejs"
});

connection.connect(function(error) {
	if (error) throw error
	else console.log("connection to database established")
});