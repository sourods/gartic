# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# copy source files
COPY . /usr/app

# install dependencies
RUN yarn

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start
