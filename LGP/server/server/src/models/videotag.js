module.exports = (sequelize) => {
  const VideoTag = sequelize.define('VideoTag', {}, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });

  return VideoTag;
};
