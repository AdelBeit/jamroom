FROM node:16.15.0 AS deps
WORKDIR /app
COPY yarn.lock .
COPY package.json .
RUN yarn

FROM node:16.15.0 AS BUILDER
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY . .
RUN yarn next build

FROM BUILDER AS app
CMD [ "yarn","next start" ]

