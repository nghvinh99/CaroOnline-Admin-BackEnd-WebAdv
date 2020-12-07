const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connect');
const bcrypt = require('bcryptjs');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'admin'
});

(async () => {
  await Admin.sync();
})();

Admin.prototype.validatePassword = async function (plainPassword) {
  try {
    const res = await bcrypt.compare(plainPassword, this.password);
    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = Admin;
