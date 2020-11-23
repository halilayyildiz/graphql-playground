const resolvers = {
    Query: {
        cars: (parent, args, { models }) => models.cars,
        car: (parent, { id }, { models }) => {
            return models.cars.filter(car => car.id === id);
        }
    },
    Mutation: {
        createCar: (parent, { id, make, model, colour }, { models }) => {
            const car = { id, make, model, colour };
            models.cars.push(car);
            return car;
        },
        removeCar: (parent, { id }, { models }) => {
            let isFound = false;
            models.cars = models.cars.filter(car => {
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
        owner: (parent, args, { models }) => models.users.filter(user => user.id === parent.ownedBy)[0]
    }
};

module.exports = resolvers;