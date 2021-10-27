const { DataTypes } = require('sequelize');
const db = require('../db');

const ReadingList = db.define('readinglist', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },      
});

module.exports = ReadingList;