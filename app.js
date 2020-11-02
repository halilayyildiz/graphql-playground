const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const users = require('./data').users;
const me = users[0];
const cars = require('./data').cars;

const typeDefs = gql `
    type Query {
        users: [User]
        user(id: Int!): User
        me: User
        cars: [Car]
        car(make: String!): [Car]
    }

    type User {
        id: ID!
        name: String!
    }

    type Car {
        make: String!
        model: String!
        color: String
    }
`;
const resolvers = {
    Query: {
        users: () => users,
        user: (parent, { id }) => {
            return users.filter(user => user.id === id)[0];
        },
        me: () => me,
        cars: () => cars,
        car: (parent, { make }) => {
            return cars.filter(car => car.make === make);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(3000, () => console.info('Apollo GraphQL servers started.'));