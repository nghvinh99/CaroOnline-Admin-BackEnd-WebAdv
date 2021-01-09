const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connect');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  point: {
    type: DataTypes.INTEGER,
  },
  account_type: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.STRING,
  },
  total_match: {
    type: DataTypes.INTEGER,
  },
  percent_win: {
    type: DataTypes.FLOAT,
  },
  rank: {
    type: DataTypes.STRING,
  },
  total_win: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.INTEGER,
  }
}, {
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  },
  tableName: 'users'
});

(async () => {
  await Users.sync();
})();

Users.getUsersList = async () => {
  try {
    const users = await Users.findAll();
    return users;
  } catch (err) {
    throw err;
  }
}

module.exports = Users;
