CREATE TABLE usuario(
    nombreDeUsuario VARCHAR(50),
    clave VARCHAR(60),
    idEvento INT
);

INSERT INTO
    usuario
VALUES
("usuario1", '1234', 1);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;