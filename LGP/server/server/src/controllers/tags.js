const { Tag } = require('../models');
const { sequelize } = require('../models');

const list = async () => Tag.findAll();

const create = async (name) => {
  const tag = Tag.create({
    name,
  });

  if (!tag) { throw new Error('Error creating tag'); }

  return tag;
};

const retrieve = async (name) => {
  const tag = Tag.findOne({
    where: { name },
  });

  if (!tag) {
    const err = new Error('Tag not found');
    err.code = 404;
    throw err;
  }

  return tag;
};

const getMostPopular = async (limit = 10) => {
  const videos = await sequelize.query('SELECT "id", "name", COUNT("tag_id") AS "videoCount" FROM "Tags", "VideoTags" AS "Tag" WHERE "id" = "tag_id" GROUP BY "Tags"."id" ORDER BY "videoCount" DESC LIMIT :limit', {
    replacements: { limit },
    type: sequelize.QueryTypes.SELECT,
    mapToModel: true,
  });

  if (!videos) {
    const err = new Error('Tags not found');
    err.code = 403;
    throw err;
  }

  return videos;
};

module.exports = {
  list,
  create,
  retrieve,
  getMostPopular,
};
