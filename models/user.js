const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const User = db.define("user", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isZinester: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = User;