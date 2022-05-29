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
  
6. /loadCSV?csv=...
  Inserta los datos de un .csv
  Los  .. indica el nombre del .csv sin especificar la extensión

7. /read
  Ver los valores que se encuentran en la base de datos

##############################
ADICIONAL
##############################

Para poder ver los mensajes por consola de la app web inserte
docker logs <CONTAINER ID>

##############################
INTEGRANTES
##############################

Dylan Samuel Cantillo Arrieta
Laura Mariana González Solano
Mariana Oquendo Hernández
