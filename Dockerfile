FROM node:alpine As builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

# COPY  package.json ./
COPY . .

RUN yarn && yarn build

###############################################################################
# Step 2 : Run image
#
FROM node:alpine
WORKDIR /usr/app

# Install deps for production only
COPY  package.json ./
RUN yarn && \
    yarn cache clean --force
# Copy builded source from the upper builder stage
COPY --from=builder /usr/app/build ./build

EXPOSE 3031

CMD [ "yarn", "start" ]
# docker build -t app-node . // Criar containner
# docker run --name server-web -p 4001:4001 -d  app-node // Rodar containenr
# docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc)
# docker-compose up -d --build
# export DOCKER_TLS_VERIFY="1"
#AWS
#  docker-machine create --driver amazonec2 aws01
#  docker-machine env aws01
# export DOCKER_HOST="tcp://52.23.248.100:2376"
# export DOCKER_CERT_PATH="/home/cgama/.docker/machine/machines/aws01"
# export DOCKER_MACHINE_NAME="aws01"
# # Run this command to configure your shell:
# # eval $(docker-machine env aws01)