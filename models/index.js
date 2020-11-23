const Sequelize = require('sequelize')
const { sequelize } = require("./database");

const UserModel = require('./user')(sequelize, Sequelize.DataTypes);
const CarModel = require('./car')(sequelize, Sequelize.DataTypes);

const models = {
    User: UserModel,
    Car: CarModel
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
})

module.exports = models;