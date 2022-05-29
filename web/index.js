const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "test",
});

app.get("/", (req, res) => {
    res.send("Proyecto docker, Node js y git de Dylan, Laura y Mariana");
});

app.get("/connectDB", (req, res) => {
    connection.connect(function(error) {
        try {
            if (error) {
                res.send("nok");
            } else {
                res.send("ok");
            }
        } catch (x) {
            res.send("nok");
        }
    });
});

app.post("/createUser", (req, res) => {
    connection.query(
        "SELECT * FROM usuario WHERE nombreDeUsuario = '" +
        req.query.nombreDeUsuario +
        "' AND clave = '" +
        req.query.clave +
        "' AND idEvento = '" +
        req.query.idEvento +
        "'",
        (err, rows) => {
            if (rows.length === 0) {
                connection.query(
                    "INSERT INTO usuario (nombreDeUsuario, clave, idEvento) VALUES ('" +
                    req.query.nombreDeUsuario +
                    "', '" +
                    req.query.clave +
                    "', " +
                    req.query.idEvento +
                    ")"
                );
                res.send("ok");
            } else {
                res.send("nok");
            }
        }
    );
});

app.get("/searchUser", (req, res) => {
    connection.query(
        "SELECT idUsuario FROM usuario WHERE nombreDeUsuario = '" +
        req.query.nombreDeUsuario +
        "' AND clave = '" +
        req.query.clave +
        "' AND idEvento = '" +
        req.query.idEvento +
        "'",
        (err, rows) => {
            if (rows.length === 0) {
                res.json(rows);
            } else {
                res.send("nok");
            }
        }
    );
});

app.get("/read", (req, res) => {
    connection.query("SELECT * FROM usuario", (err, rows) => {
        if (err) {

        } else {
            res.json(rows);
        }
    })
});

app.listen(5000, () => console.log("listining on port 5000"));