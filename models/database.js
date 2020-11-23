const Sequelize = require('sequelize')
const sequelize = new Sequelize('graphql', 'root', 'password', {
    dialect: 'mysql',
    operatorAliases: false,
    define: {
        timestamps: false
    }
});

module.exports = {
    sequelize
};