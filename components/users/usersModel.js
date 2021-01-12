const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const { Op } = require('sequelize');
const History = require('../history/historyModel');

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

Users.count = async () => {
  try {
    const user = await Users.findAll();
    return user.length;
  } catch (err) {
    throw err;
  }
}

Users.getUsersList = async (filter) => {
  try {
    const users = await Users.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: '%' + filter.search + '%' } },
          { email: { [Op.like]: '%' + filter.search + '%' } },
        ]
      },
      order: [
        [filter.sortBy, filter.order]
      ],
    });
    return users;
  } catch (err) {
    throw err;
  }
}

Users.getOneUser = async (userId) => {
  try {
    const user = await Users.findOne({
      where: {
        id: userId,
      }
    });
    return user;
  } catch (err) {
    throw err;
  }
}

Users.getAllPlayerNames = async () => {
  try {
    const names = await Users.findAll({
      attributes: ['id', 'name']
    })
    return names;
  } catch (err) {
    throw err;
  }
}

Users.flipStatus = async (userId) => {
  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (user) {
      const flip = await Users.update({
        status: 1 - user.status,
      }, {
        where: {
          id: userId
        },
        silent: true
      })
      if (flip.length !== 0) {
        return true;
      }
    }
    return false;
  } catch (err) {
    throw err;
  }
}

module.exports = Users;
