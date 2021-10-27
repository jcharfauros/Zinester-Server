const User = require('./user');
const Zine = require('./zine');
const Zine2 = require('./zine2');
const ReadingList = require('./readinglist');
// const Profile = require('./profile');
// const Reviews = require('./reviews');
// create individual files for your models and import them here

// Setup Associations
User.hasMany(Zine);
Zine.belongsTo(User);

User.hasMany(ReadingList);
ReadingList.belongsTo(User);

ReadingList.hasMany(Zine2);
Zine2.belongsTo(ReadingList);

// User.hasOne(Profile);
// Profile.belongsTo(User);

// Zine.hasMany(Reviews);
// Reviews.belongsTo(Zine);

// User.hasMany(Reviews);
// Reviews.belongsTo(User);

module.exports = {
    User,
    Zine,
    Zine2,
    ReadingList,
//  Profile,
//  Reviews,
};