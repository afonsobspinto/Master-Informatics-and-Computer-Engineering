module.exports = (sequelize) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });

  ShoppingCart.associate = (models) => {
    ShoppingCart.belongsTo(models.User, {
      as: 'owner',
    });

    ShoppingCart.addScope('withVideos', {
      include: [{
        model: models.Video,
        as: 'videos',
      }],
    });

    ShoppingCart.belongsToMany(models.Video, {
      through: 'UserCart',
      as: 'videos',
    });
  };

  return ShoppingCart;
};
