CREATE TABLE usuario(
    idUsuario INT AUTO_INCREMENT,
    nombreDeUsuario VARCHAR(50),
    clave VARCHAR(60),
    idEvento INT,
    PRIMARY KEY (idUsuario)
);

INSERT INTO
    usuario (nombreDeUsuario, clave, idEvento)
VALUES
("usuario1", '1234', 1);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;