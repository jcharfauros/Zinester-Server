const { DataTypes } = require('sequelize');
const db = require('../db');

const Zine = db.define('zine', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    yearCreated: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    zineImg: {
        type: DataTypes.STRING,
        allowNull: true,
    }   
});

module.exports = Zine;