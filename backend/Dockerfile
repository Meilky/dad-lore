# ---- Base
FROM node:latest as base 

WORKDIR /usr/dad-lore/backend/

COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./src ./src

RUN npm install

EXPOSE 3000

# ---- Prod
FROM base as prod

CMD npm run start


# ---- Dev
FROM base as dev

CMD npm run watch
