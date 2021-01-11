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
      return this.getDataValue('data').split(';')
    },
    set(val) {
      this.setDataValue('data', val.join(';'));
    },
  },
  chat: {
    type: DataTypes.STRING,
    get() {
      return this.getDataValue('chat').split(';')
    },
    set(val) {
      this.setDataValue('chat', val.join(';'));
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
    const history = await History.findAll({
      // where: {
      //   [Op.or]: [
      //     { name: { [Op.like]: '%' + filter.search + '%' } },
      //     { email: { [Op.like]: '%' + filter.search + '%' } },
      //   ]
      // },
      // order: [
      //   [filter.sortBy, filter.order]
      // ],
    });
    return history;
  } catch (err) {
    throw err;
  }
}

History.getGameData = async (id) => {
  try {
    const data = await
      sequelize.query("SELECT data from histories WHERE id=" + id);
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = History;
