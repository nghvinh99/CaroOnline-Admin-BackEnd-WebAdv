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
}, {
  tableName: 'admin'
});

(async () => {
  await Admin.sync();
  const admin = await Admin.findOne({
    where: {
      id: 1
    }
  });
  if (!admin) {
    Admin.create({
      id: 1,
      username: 'admin',
      password: '$2y$12$gr1hk/PfyvvsclnZyUIGTOXQ0nSSLhxE8HpO262/zzuxij8XD1dcu',
    })
  }
})();

Admin.prototype.validatePassword = async function (plainPassword) {
  try {
    const res = await bcrypt.compare(plainPassword, this.password);
    return res;
  } catch (err) {
    throw err;
  }
}

Admin.getProfile = async (id) => {
  try {
    const admin = await Admin.findOne({
      where: {
        id: id,
      }
    });
    return admin;
  } catch (err) {
    throw err;
  }
}

module.exports = Admin;
