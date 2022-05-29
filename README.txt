##############################
COMANDOS DE DOCKER
##############################

git clone https://github.com/Dysaca22/docker-node-git.git
cd docker-node-git
docker-compose up

##############################
RUTAS
##############################

1. /
  Bienvenida
2. /connectDB
  Devuelve un ok si la conexión de la base de datos es exitosa y un nok en caso contrario
3. /createUser?nombreDeUsuario=...&clave=...&idEvento=...
  Se debe devolver ok en caso de que el usuario no exista y un nok en caso contrario. 
  Almacenar en la base de datos en caso ok
  Los ... indica el valor que se le asignara al parametro
4. /searchUser?nombreDeUsuario=...&clave=...&idEvento=...
  Devolver el id de usuario en caso exitoso y un nok en caso contrario
  Los ... indica el valor que se le asignara al parametro
5. /deleteAll
  Borrar todos los usuarios de la base de datos
  Devuelve "Se han eliminado los usuarios correctamente." si todo se elimino correctamente
6. /read
  Ver los valores que se encuentran en la base de datos
