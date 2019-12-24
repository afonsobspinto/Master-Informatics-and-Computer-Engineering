const {
  Video,
} = require('../models');

const create = async (uploaderId, highQualityPath, watermarkPath, price, size, duration,
  rating, bitrate, tagNames) => Video.create({
  uploaderId,
  highQualityPath,
  watermarkPath,
  price,
  size,
  duration,
  rating,
  bitrate,
  tagNames,
});

const list = async () => Video.findAll();

const update = async (id, price) => {
  const video = await Video.findByPk(id);

  if (!video) {
    const err = new Error('Video not found');
    err.code = 404;
    throw err;
  }

  return video.update({
    price,
  });
};


const getMostPopular = async (number) => {
  const videos = await Video.findAll({
    order: [
      ['viewCount', 'DESC'],
    ],
    limit: number,
  });

  if (!videos) {
    const err = new Error('Videos not found');
    err.code = 403;
    throw err;
  }

  return videos;
};

const getLatest = async (number) => {
  const videos = await Video.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: number,
  });

  if (!videos) {
    const err = new Error('Videos not found');
    err.code = 403;
    throw err;
  }

  return videos;
};

const destroy = async (id) => {
  const video = await Video.findByPk(id);

  if (!video) {
    const err = new Error('Video not found');
    err.code = 404;
    throw err;
  }

  return video.destroy();
};

const retrieve = async (id) => {
  const video = await Video.findByPk(id);

  if (!video) {
    const err = new Error('Video not found');
    err.code = 404;
    throw err;
  }

  return video;
};

const incrementViewCount = async (id) => {
  const video = await Video.findByPk(id);

  if (!video) {
    const err = new Error('Video not found');
    err.code = 404;
    throw err;
  }

  return video.update({
    viewCount: video.viewCount + 1,
  });
};

module.exports = {
  create,
  list,
  update,
  destroy,
  retrieve,
  getMostPopular,
  getLatest,
  incrementViewCount,
};
