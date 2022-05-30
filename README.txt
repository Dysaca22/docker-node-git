##############################
COMANDOS DE DOCKER
##############################

git clone https://github.com/Dysaca22/docker-node-git.git
cd docker-node-git
docker-compose up -d --build

##############################
RUTAS
##############################

1. / (GET)
  Bienvenida
  
2. /connectDB (GET)
  Devuelve un ok si la conexión de la base de datos es exitosa y un nok en caso contrario
  
3. /createUser?nombreDeUsuario=...&clave=...&idEvento=... (POST)
  Se debe devolver ok en caso de que el usuario no exista y un nok en caso contrario. 
  Almacenar en la base de datos en caso ok
  Los ... indica el valor que se le asignara al parametro
  
4. /searchUser?nombreDeUsuario=...&clave=...&idEvento=... (GET)
  Devolver el id de usuario en caso exitoso y un nok en caso contrario
  Los ... indica el valor que se le asignara al parametro
  
5. /deleteAll (GET)
  Borrar todos los usuarios de la base de datos
  Devuelve "Se han eliminado los usuarios correctamente." si todo se elimino correctamente
  
6. /loadCSV (POST)
  Inserta los datos de un .csv
  El field name del parámetro debe ser "file" y un csv delimitado por coma (,)

7. /read (GET)
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
