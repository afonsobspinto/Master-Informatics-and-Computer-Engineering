const { Thumbnail } = require('../models');

const list = async () => Thumbnail.findAll();

const create = async (path) => {
  const thumbnail = Thumbnail.create({
    path,
  });

  if (!thumbnail) { throw new Error('Error creating thumbnail'); }

  return thumbnail;
};

const retrieve = async (name) => {
  const thumbnail = Thumbnail.findOne({
    where: { name },
  });

  if (!thumbnail) {
    const err = new Error('Thumbnail not found');
    err.code = 404;
    throw err;
  }

  return thumbnail;
};

module.exports = {
  list,
  create,
  retrieve,
};
