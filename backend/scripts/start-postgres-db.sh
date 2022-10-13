
#!/bin/bash
set -e
USER='user'
SERVER="my_database_server";
PW="mysecretpassword";
DB="my_database";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e POSTGRES_DB=$DB\
  -e POSTGRES_USER=$USER\
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres
