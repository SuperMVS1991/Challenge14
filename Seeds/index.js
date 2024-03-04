// we need to seed 3 things: users, posts, and comments
var userSeeds = require('./userSeeds');
var postSeeds = require('./blogPostSeeds');
var commentSeeds = require('./commentSeeds');
var sequelize = require('../config/connection');

// we need to seed 3 things: users, posts, and comments
function seedAll() {
  return sequelize.sync({ force: true }).then(async () => {
    await userSeeds();
    await postSeeds();
    await commentSeeds();
  });
}
seedAll();