const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    card: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password', 'card'] },
    },
    scopes: {
      withPassword: {
        attributes: { },
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Video, {
      foreignKey: 'uploaderId',
      as: 'uploadedVideos',
    });

    User.hasOne(models.ShoppingCart, {
      foreignKey: 'shoppingCartId',
      as: 'cart',
    });
  };

  // eslint-disable-next-line
  User.prototype.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  };

  User.beforeCreate(async (user) => {
    /* eslint-disable */
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    console.log("before");
    console.log(user.password);

  });

  User.hashPassword = async (password) => {
   
    const cenas = await bcrypt.hash(password, SALT_WORK_FACTOR);
    console.log("before2");
    console.log(cenas);
    return cenas;
  };

  return User;
};
