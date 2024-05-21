### ÉTAPE 1 : Build ### 
FROM node:12.7-alpine AS build 
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./ 
RUN npm install 
COPY . . 
RUN npm run build


FROM nginx:alpine
COPY /pss-ui /usr/share/nginx/html/pss-ui/
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /pss-ui /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# FROM node:latest as builder

# RUN mkdir -p /app

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# ENV PATH="./node_modules/.bin:$PATH"

# COPY . ./

# RUN npm run build --prod

# VOLUME /tmp
# ADD ./pss-ui /pss-ui

# CMD ["npm", "start"]
 
# FROM nginx:alpine
# COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
# COPY --from=builder app/dist/angular8-crud-demo usr/share/nginx/html