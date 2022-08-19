const express = require("express");
const { sequelize } = require("./models");
const { success } = require("consola");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const models = require("./models");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
require("dotenv").config();

const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");

const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://studio.apollographql.com",
    "https://project-management-client-1.herokuapp.com",
  ],
  credentials: true,
};

const app = express();

const redisClient = redis.createClient(process.env.REDIS_URL);

app.set("trust proxy", 1);

app.use(
  session({
    name: "qid",
    store: new RedisStore({ client: redisClient, disableTouch: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ models, req, res }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startApp = async () => {
  // Inject Apollo Server middleware on express app
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });

  await sequelize.sync({ logging: false });

  app.listen(PORT, () =>
    success({ badge: true, message: `Server started on PORT ${PORT}` })
  );
};

startApp();
