module.exports = (sequelize, DataTypes) => {
  const Thumbnail = sequelize.define('Thumbnail', {
    path: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['videoId', 'VideoId', 'createdAt', 'updatedAt'] },
    },
  });

  Thumbnail.associate = (models) => {
    Thumbnail.belongsTo(models.Video, {
      as: 'video',
    });
  };
  return Thumbnail;
};
