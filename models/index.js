const User = require("./user");
const Zine = require('./zine');
const ReadingList = require('./readinglist');
const Profile = require('./profile');
// const Reviews = require('./reviews');
// create individual files for your models and import them here

// Setup Associations
User.hasMany(Zine);
Zine.belongsTo(User);

User.hasMany(ReadingList);
ReadingList.belongsTo(User);

Zine.hasMany(ReadingList);
ReadingList.hasMany(Zine);

User.hasOne(Profile);
Profile.belongsTo(User);

Zine.hasMany(Reviews);
Reviews.belongsTo(Zine);

// User.hasMany(Reviews);
// Reviews.belongsTo(User);

module.exports = {
User,
Zine,
ReadingList,
Profile,
// Reviews,
};