require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

const startServer = async () => {
  try {
    await client.connect();
    db = client.db(); // No need to pass DB_NAME here since it's included in MONGO_URI
    console.log('Connected to MongoDB');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { db },
    });

    await server.start();
    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (error) {
    console.error('Failed to start server', error);
  }
};

startServer();
