
const { User, Video } = require('../models');

const list = async () => User.findAll();

const retrieve = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const getUploadedVideos = async id => Video.findAll({
  where: {
    uploaderId: id,
  },
});

const updateEmail = async (id, newEmail) => {
  const user = await User.findByPk(id);

  return user.update({ email: newEmail },
    { returning: true });
};

const updatePassword = async (id, newPassword) => {
  const user = await User.findByPk(id);
  const hashedPassword = await User.hashPassword(newPassword);

  return user.update({ password: hashedPassword },
    { returning: true });
};

const updateCard = async (id, newCard) => {
  const user = await User.findByPk(id);
  return user.update({ card: newCard },
    { returning: true });
};


module.exports = {
  list,
  retrieve,
  updateEmail,
  updatePassword,
  updateCard,
  getUploadedVideos,
};
