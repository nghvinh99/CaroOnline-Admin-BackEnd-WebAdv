const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  database: 'caroOnline',
  username: 'root',
  password: ''
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