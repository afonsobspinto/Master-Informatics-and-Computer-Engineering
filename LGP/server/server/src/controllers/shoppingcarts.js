const { ShoppingCart, User } = require('../models');

const list = async () => ShoppingCart.findAll();

const create = async (userId, clear = false) => {
  const user = await User.findByPk(userId);

  const cart = await user.getCart();
  if (cart && !clear) {
    const err = new Error('User already has cart');
    err.code = 403;
    throw err;
  }
  const newCart = await ShoppingCart.create({});

  await newCart.setOwner(user);
  await user.setCart(newCart);

  return user.getCart({ scope: 'withVideos' });
};

const retrieve = async (userId) => {
  const user = await User.findByPk(userId);

  const cart = await user.getCart({ scope: 'withVideos' });
  if (!cart) {
    const err = new Error('ShoppingCart not found');
    err.code = 404;
    throw err;
  }
  return cart;
};

module.exports = {
  list,
  create,
  retrieve,
};
