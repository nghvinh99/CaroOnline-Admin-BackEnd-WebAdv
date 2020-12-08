const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
})

async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (err) {
    // console.error('Unable to connect to the database:', err);
    throw err;
  }
};

module.exports = sequelize;