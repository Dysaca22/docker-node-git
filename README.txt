##############################
COMANDOS INICIO EN DOCKER
##############################

git clone https://github.com/Dysaca22/docker-node-git.git
cd docker-node-git
docker-compose up -d --build

##############################
COMANDOS PRUEBA EN DOCKER
##############################

1. Bienvenida
  Sintaxis: curl -X GET "<url de docker>/"
  Ejemplo: curl -X GET "http://ip172-18-0-42-caaci9433d5g009rl92g-5000.direct.labs.play-with-docker.com/"
 
2. Verificar conexión a la base de datos
  Sintaxis: curl -X GET "<url de docker>/connectDB"
  Ejemplo: curl -X GET "http://ip172-18-0-42-caaci9433d5g009rl92g-5000.direct.labs.play-with-docker.com/connectDB"

3. Crear un usuario
  Sintaxis: curl -X POST "<url de docker>/createUser?nombreDeUsuario=<nombre de usuario>&clave=<clave del usuario>&idEvento=<id del evendo del usuario>"
  Ejemplo: curl -X GET "http://ip172-18-0-42-caaci9433d5g009rl92g-5000.direct.labs.play-with-docker.com/createUser?nombreDeUsuario=usaurio1&clave=1234&idEvento=1"
 
4. Autenticar un usuario
  Sintaxis: curl -X GET "<url de docker>/searchUser?nombreDeUsuario=<nombre de usuario>&clave=<clave del usuario>&idEvento=<id del evendo del usuario>"
  Ejemplo: curl -X GET "http://ip172-18-0-42-caaci9433d5g009rl92g-5000.direct.labs.play-with-docker.com/searchUser?nombreDeUsuario=usaurio2&clave=1234&idEvento=1"

5. Borrar todos los usuarios de la base de datos
  Sintaxis: curl -X GET "<url de docker>/deleteAll"
  Ejemplo: curl -X GET "http://ip172-18-0-42-caaci9433d5g009rl92g-5000.direct.labs.play-with-docker.com/deleteAll"

6. Cargar usuarios desde un .csv
  Sintaxis: 
  Ejemplo: 
  
7. Ver elementos de la tabla usuario
  Sintaxis: Sintaxis: curl -X GET "<url de docker>/read"
  Ejemplo: curl -X GET "http://ip172-18-0-42-caaci9433d5g009rl92g-5000.direct.labs.play-with-docker.com/read"

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
  
4. /searchUser?nombreDeUsuario=...&clave=...&idEvento=... (POST)
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
