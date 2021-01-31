import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import morgan from 'morgan';

import schema from './schema';
import resolvers from './resolvers';
import context from './context';
import { connectDb } from './models';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context,
  formatError: (error) => {
    // ! format error message here
    const message = error.message;
    return {
      ...error,
      message,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

connectDb().then(async () => {
  httpServer.listen({ port }, async () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});
