const { Sequelize, DataTypes } = require('sequelize');
const Op = require('sequelize').Op;
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'admin'
});

(async () => {
  await Admin.sync({
    force: true,
  });
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
      email: 'nguyenhuuvinhbtbt@gmail.com'
    })
  }
})();

Admin.changeEmail = async (info) => {
  try {
    const admin = await Admin.update({
      email: info.email,
    }, {
      where: {
        id: info.id
      }
    })
    return admin;
  } catch (err) {
    throw err;
  }
}

Admin.resetPassword = async (token, password) => {
  try {
    const newPass = bcrypt.hashSync(password, 12);
    const admin = await Admin.update({
      password: newPass,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    }, {
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        }
      }
    });
    return admin;
  } catch (err) {
    throw err;
  }
}

Admin.resetPasswordReq = async (email, token) => {
  try {
    const admin = await Admin.update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 300000,
    }, {
      where: {
        email: email,
      }
    });
    return admin;
  } catch (err) {
    throw err;
  }
}

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

Admin.changePassword = async (info) => {
  try {
    const newPass = bcrypt.hashSync(info.pass, 12);
    const admin = await Admin.update({
      password: newPass,
    }, {
      where: {
        id: info.id
      }
    })
    return admin;
  } catch (err) {
    throw err;
  }
}

module.exports = Admin;
