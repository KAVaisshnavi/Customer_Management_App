const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Customer = require('./Customer')(sequelize, DataTypes);
db.Address = require('./Address')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);

// Relations
db.Customer.hasMany(db.Address, { foreignKey: 'customerId', onDelete: 'CASCADE' });
db.Address.belongsTo(db.Customer, { foreignKey: 'customerId' });

module.exports = db;
