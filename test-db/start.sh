#!/bin/sh

# Run the Mysql container, with a database named 'users' and credentials
# for a users-service user which can access it.
echo "\nStarting DB..."
docker run --name db -d \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e MYSQL_DATABASE=users -e MYSQL_USER=users_service -e MYSQL_PASSWORD=123 \
  -p 3306:3306 \
  mysql:latest & wait

# Wait for the database service to start up.
echo "\nWaitting for DB to start up..."
sleep 15

# FIX: ER_NOT_SUPPORTED_AUTH_MODE
# Changing plugin to *mysql_native_password* instead of *caching_sha2_password*
# @see: https://github.com/mysqljs/mysql/issues/1507#issuecomment-385224467
echo "\nChanging plugin to mysql_native_password instead of caching_sha2_password"
docker exec -i db mysql -uroot -p123 mysql < fix_support_authmode.sql
sleep 1

# Run the setup script.
echo "\nSetting up initial data..."
docker exec -i db mysql -uusers_service -p123 users < setup.sql
