const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const models = require('./models')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models
    }
});
server.applyMiddleware({ app });

app.use(cors());
app.listen(3000, () => console.info('Apollo GraphQL servers started.'));