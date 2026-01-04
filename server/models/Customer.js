module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [10, 15] // Basic validation
            }
        }
    }, {
        timestamps: true
    });
    return Customer;
};
