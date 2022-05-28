const express = require("express");
const mysql = require("mysql");
const app = express();

var connection;

app.get("/", (req, res) => {
    res.send('Proyecto docker, Node js y git de Dylan, Laura y Mariana');
});

app.get("/connectDB", (req, res) => {
    try {
        connection = mysql.createPool({
            connectionLimit: 10,
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "password",
            database: process.env.MYSQL_DATABASE || "test",
        });
        res.send("ok");
    } catch {
        res.send("nok");
    }
});

app.listen(5000, () => console.log("listining on port 5000"));