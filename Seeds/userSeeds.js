const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');


const userData = [
    {
        name: "user1",
        email: "fake1.email@gmail.com",
        password: "password1"
    },
    {
        name: "user2",
        email: "fake2.email@gmail.com",
        password: "password2"
    },
    {
        name: "user3",
        email: "fake3.email@gmail.com",
        password: "password3"
    },
    {
        name: "user4",
        email: "fake4.email@gmail.com",
        password: "password4"
    },
    {
        name: "user5",
        email: "fake5.email@gmail.com",
        password: "password5"
    }
   
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUsers;