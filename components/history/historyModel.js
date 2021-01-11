const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const { Op } = require('sequelize');

const History = sequelize.define('History', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  board: {
    type: DataTypes.INTEGER,
  },
  winner: {
    type: DataTypes.INTEGER,
  },
  loser: {
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.STRING,
    get() {
      return JSON.parse(this.getDataValue('data'));
    },
    set(val) {
      this.setDataValue('data', JSON.stringify(val));
    },
  },
  chat: {
    type: DataTypes.STRING,
    get() {
      return JSON.parse(this.getDataValue('chat'));
    },
    set(val) {
      this.setDataValue('chat', JSON.stringify(val));
    },
  },
  type: {
    type: DataTypes.STRING,
  },
}, {
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  },
  tableName: 'histories'
});

(async () => {
  await History.sync();
})();

History.getHistoryList = async (filter) => {
  try {
    const history = await History.findAll();
    return history;
  } catch (err) {
    throw err;
  }
}

History.getGameData = async (id) => {
  try {
    // const data = await
    //   sequelize.query("SELECT data from histories WHERE id=" + id);
    const data = await History.findOne({
      where: {
        id: id,
      }
    })
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = History;
