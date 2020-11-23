// parent, args, context, info
const resolvers = {
    Query: {
        users: (parent, args, { models }) => models.users,
        user: (parent, { id }, { models }) => {
            return models.users.filter(user => user.id === id)[0];
        },
        me: (parent, args, { me }) => me
    },
    Mutation: {
        makeUser: (parent, { id, name }, { models }) => {
            const user = { id, name };
            models.users.push(user);
            return user;
        },
        removeUser: (parent, { id }, { models }) => {
            let isFound = false;
            models.users = models.users.filter(user => {
                if (user.id === id) {
                    isFound = true;
                    return false
                } else {
                    return true;
                }
            });

            return isFound;
        }
    },
    User: {
        cars: (parent, args, { models }) => models.cars.filter(car => car.ownedBy === parent.id)
    }
};

module.exports = resolvers;