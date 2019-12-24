module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    highQualityPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    watermarkPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bitrate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {});

  Video.associate = (models) => {
    Video.belongsTo(models.User, {
      as: 'uploader',
    });

    Video.belongsToMany(models.Tag, {
      through: 'VideoTag',
      foreignKey: 'video_id',
    });

    Video.belongsToMany(models.ShoppingCart, {
      through: 'UserCart',
    });

    Video.hasMany(models.Thumbnail, {
      as: 'thumbnails',
    });

    Video.addScope('defaultScope', {
      include: [{
        model: models.Tag,
      }, {
        model: models.Thumbnail,
        as: 'thumbnails',
      },
      {
        model: models.User,
        as: 'uploader',
      },
      ],
    });
  };

  return Video;
};
