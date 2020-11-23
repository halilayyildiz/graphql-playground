const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
let users = require('./data').users;
const me = users[0];
let cars = require('./data').cars;

const typeDefs = gql `
    type Query {
        users: [User]
        user(id: Int!): User
        me: User
        cars: [Car]
        car(id: Int!): [Car]
    }

    type Mutation {
        makeUser(id: Int!, name: String!): User!
        removeUser(id: Int!): Boolean
        createCar(id: Int!, make: String!, model: String!, colour: String!): Car!
        removeCar(id: Int!): Boolean
    }

    type User {
        id: ID!
        name: String!
        cars: [Car]
    }

    type Car {
        id: ID!
        make: String!
        model: String!
        colour: String!
        owner: User!
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
        car: (parent, { id }) => {
            return cars.filter(car => car.id === id);
        }
    },
    Mutation: {
        makeUser: (parent, { id, name }) => {
            const user = { id, name };
            users.push(user);
            return user;
        },
        removeUser: (parent, { id }) => {
            let isFound = false;
            users = users.filter(user => {
                if (user.id === id) {
                    isFound = true;
                    return false
                } else {
                    return true;
                }
            });

            return isFound;
        },
        createCar: (parent, { id, make, model, colour }) => {
            const car = { id, make, model, colour };
            cars.push(car);
            return car;
        },
        removeCar: (parent, { id }) => {
            let isFound = false;
            cars = cars.filter(car => {
                if (car.id === id) {
                    isFound = true;
                    return false
                } else {
                    return true;
                }
            });

            return isFound;
        }
    },
    Car: {
        owner: parent => users.filter(user => user.id === parent.ownedBy)[0]
    },
    User: {
        cars: parent => cars.filter(car => car.ownedBy === parent.id)
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(3000, () => console.info('Apollo GraphQL servers started.'));