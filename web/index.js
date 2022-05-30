const express = require("express");
const mysql = require("mysql");
const csvtojson = require("csvtojson");
const fileupload = require("express-fileupload");

const app = express();
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

const configDB = {
    connectionLimit: 1000,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "test",
};

const pool = mysql.createPool(configDB);


app.get("/", (req, res) => {
    res.send("Proyecto docker, Node js y git de Dylan, Laura y Mariana");
});

app.get("/connectDB", (req, res) => {
    pool.getConnection(function(err, connection) {
        if (connection.state === "disconnected") {
            res.send("nok");
        } else {
            res.send("ok");
        }
        connection.end();
    });
});

app.post("/createUser", (req, res) => {
    pool.getConnection(function(err, connection) {

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
        connection.end();
    });
});

app.get("/searchUser", (req, res) => {
    pool.getConnection(function(err, connection) {
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
        connection.end();
    });
});

app.get("/deleteAll", (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query("DELETE FROM usuario", (err, rows) => {
            if (err) {
                res.send("Error en la eliminación");
            } else {
                res.send("Se han eliminado los usuarios correctamente.");
            }
        });
        connection.end();
    });
});

app.post("/loadCSV", async(req, res) => {
    if (!req.files) return res.send("Sin archivos cargados");

    const repe = [];
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
                        await pool.getConnection(function(err, connection) {

                            connection.query(
                                "SELECT * FROM usuario WHERE nombreDeUsuario = '" +
                                nombreDeUsuario +
                                "' AND clave = '" +
                                clave +
                                "' AND idEvento = '" +
                                idEvento +
                                "'",
                                (err, rows) => {
                                    if (rows.length === 0) {
                                        connection.query(
                                            "INSERT INTO usuario (nombreDeUsuario, clave, idEvento) VALUES ('" +
                                            nombreDeUsuario +
                                            "', '" +
                                            clave +
                                            "', " +
                                            idEvento +
                                            ")"
                                        );
                                    } else {
                                        repe = repe.concat([i + 1]);
                                    }
                                }
                            );
                            connection.end();
                        });
                    }
                    if (repe.length === 0) {
                        res.send("ok");
                    } else {
                        res.send(`Filas ${repe} nok, las demas ok`);
                    }
                } catch (e) {
                    console.log(e);
                    res.send("Hubo un error cargando el csv");
                }
            });
    } catch {
        res.send("El nombre del parametro del archivo debe llamarse 'file'");
    }
});

app.get("/read", (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM usuario", (err, rows) => {
            if (err) {
                res.send(err);
            } else {
                res.json(rows);
            }
        });
        connection.end();
    });
});

app.listen(5000, () => console.log("listining on port 5000"));