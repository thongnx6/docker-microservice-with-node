#!/bin/sh

# Stop the db and remove the coitainer.
echo "Stop the db coitainer..."
docker stop db

echo "Remove the db container..."
docker rm db
