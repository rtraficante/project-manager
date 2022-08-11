const express = require("express");
const { sequelize } = require("./models");
const { success } = require("consola");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const models = require("./models");

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"],
};

async function main() {
  await sequelize.sync({ logging: false });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

const startApp = async () => {
  // Inject Apollo Server middleware on express app
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
  main();
  app.listen(PORT, () =>
    success({ badge: true, message: `Server started on PORT ${PORT}` })
  );
};

startApp();