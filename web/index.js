const express = require("express");
const mysql = require("mysql");
const csvtojson = require('csvtojson');
const fileupload = require('express-fileupload');

const app = express();
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

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
                res.send("nok");
            } else {
                res.json(rows);
            }
        }
    );
});

app.get("/deleteAll", (req, res) => {
    connection.query("DELETE FROM usuario", (err, rows) => {
        if (err) {
            res.send("Error en la eliminación");
        } else {
            res.send("Se han eliminado los usuarios correctamente.");
        }
    });
});

app.post("/loadCSV", async(req, res) => {
    if (!req.files) return res.status(400).send("Sin archivos cargados");

    try {
        const file = req.files.file;

        await csvtojson()
            .fromFile(file.tempFilePath)
            .then(async(source) => {
                try {
                    for (var i = 0; i < source.length; i++) {
                        var nombreDeUsuario = source[i]["nombreDeUsuario"],
                            clave = source[i]["clave"],
                            idEvento = source[i]["idEvento"];

                        await connection.query(`INSERT INTO usuario (nombreDeUsuario, clave, idEvento) values(${nombreDeUsuario}, ${clave}, ${idEvento})`, (err, rows) => {
                            if (err) {
                                res.status(400).send(`Error ingresando la fila ${(i + 1)}`);
                            }
                        });
                    }
                    res.send("Se agregaron todos los elementos correctamente");
                } catch {
                    res.send("Hubo un error cargando el csv");
                }
            });
    } catch {
        res.send("El nombre del parametro del archivo debe llamarse 'file'");
    }
});

app.get("/read", (req, res) => {
    connection.query("SELECT * FROM usuario", (err, rows) => {
        if (err) {} else {
            res.json(rows);
        }
    });
});

app.listen(5000, () => console.log("listining on port 5000"));