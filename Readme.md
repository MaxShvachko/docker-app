# To start the application

- Step 1: install [Docker](https://docs.docker.com/get-docker/) 
- Step 2: pull docker images for [mongo](https://hub.docker.com/_/mongo), [mongo-express](https://hub.docker.com/_/mongo-express), [node](https://hub.docker.com/_/node)
`docker pull 'image name'`
- Step 3: build a docker image from the application
  `docker build -t test-docker .`
The dot "." at the end of the command denotes location of the Dockerfile.
- Step 4: run command in the root folder `docker-compose -f docker-compose.yaml up`.
- Step 5: open [mongo-express client](http://locolhost:8080) and create db `user-account`
- Step 6: create collection `users` in db `user-account`

#### Now you can open [app page](http:/localhost:3000) and change user profile data

##### For stopping the docker compose run command `docker-compose -f docker-compose.yaml down`
