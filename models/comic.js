const { DataTypes } = require('sequelize');
const db = require('../db');

const Comic = db.define('comic', {
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
    comicImg: {
        type: DataTypes.STRING,
        allowNull: true,
    }   
});

module.exports = Comic;