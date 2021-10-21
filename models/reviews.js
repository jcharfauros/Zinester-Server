const { DataTypes } = require('sequelize');
const db = require('../db');

const Reviews = db.define('comments', {
title: {
type: DataTypes.STRING(100),
allowNull: false,
},
comment: {
type: DataTypes.STRING(500),
allowNull: false,
},
createDate: {
type: DataTypes.DATE,
allowNull: false,
}
})

export default Reviews;