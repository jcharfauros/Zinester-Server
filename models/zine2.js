//this table is where the Readlist will be pulling zine JSON from
const { DataTypes } = require('sequelize');
const db = require('../db');

const Zine2 = db.define('zine2', {
    zineTwo: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    hasRead: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
});

module.exports = Zine2;