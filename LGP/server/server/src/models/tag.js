module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['VideoTag', 'createdAt', 'updatedAt'] },
    },
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Video, {
      through: 'VideoTag',
      foreignKey: 'tag_id',
    });
  };
  return Tag;
};
