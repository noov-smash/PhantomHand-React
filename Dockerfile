FROM ubuntu:21.04

RUN apt-get update -y

# Install Java
RUN apt-get install -y curl openjdk-11-jre-headless

# Install Node JS
RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install nodejs

# Install npm
RUN npm i -g npm

# Install Yarn
RUN apt-get install -y yarn

# Install firebase
RUN npm install -g firebase-tools

# Clean
RUN apt-get clean \
 && rm -rf /var/lib/apt/lists/*

ENV TZ="Asia/Tokyo"
