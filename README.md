# docker-microservice-with-node

Sample how to build a testable, deployable, scalable microservice using NodeJS and Docker.

## Pre-requisites

You must have Docker and NodeJS installed for this code to work! Check the list if you haven't got it installed.

- [Docker Installation Guide](https://docs.docker.com/install/)
- [NodeJS Installation Guide](https://nodejs.org/en/download/)

## Structure folder

```bash
/test-db                # Wrapping up the Test Database
/users-service          # Root of our node.js microservice
  - package.json        # Init dependencies, metadata
  - index.js            # Main entrypoint of the app, as a component in a distributed system
  - api/                # Our apis and api test
  - config/             # Configuration for the app
  - repository/         # ORM or Abstraction over our DB
  - server/             # Server side setup code
```

## Development mode

As wrapping up the Test Database, to start or stop the test database, just use the commands bellow:

```bash
cd ./test-db
./start.sh          # to starts the test database
./stop.sh           # to stops the test database
```

To the test server, please use some commands bellow (if you want, you can use `npm` instead of `yarn`):

```bash
cd ./users-service
yarn                # setup everything related package depedencies and metadata.
yarn test           # unit test - mock DB then no need for a test database required running
yarn start          # run the server - you must have a test database running
```

You can also run the test server in its own container:

```bash
cd ./users-service
docker build -t users-service .
docker run -it \
          -p 8123:8123 \         # map the host port 8123 to the container port 8123
          --link db:db \         # link to the container named *db* and refer to it as *db*
          -e DATABASE_HOST=DB \  # set the *DATABASE_HOST* enviroment variable to *db*
          users-service
```

Now when we go to `localhost:8123/users` everything works!