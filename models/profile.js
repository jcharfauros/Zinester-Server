const { DataTypes } = require('sequelize');
const db = require('db');

const Profile = db.define('profile', {
bio: {
type: DataTypes.STRING(1000),
allowNull: true,
},
onlineShop: {
type: DataTypes.STRING,
allowNull: true,
},
socialMedia: {
type: DataTypes.STRING,
allowNull: true,
},
other: {
type: DataTypes.STRING,
allowNull: true,
}
});

export default Profile;