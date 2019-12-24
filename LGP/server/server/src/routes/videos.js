const router = require('express').Router();
const { videoController, tagController, thumbnailController } = require('../controllers');
const composer = require('../composer/data.service');


router.post('/videos', async (req, res) => {
  const {
    uploaderId, highQualityPath, watermarkPath,
    price, size, duration, rating, bitrate, tagNames, thumbnails,
  } = req.body;

  try {
    const video = await videoController.create(uploaderId, highQualityPath, watermarkPath, price,
      size, duration, rating, bitrate, tagNames);

    tagNames.forEach(async (tagName) => {
      let tag = await tagController.retrieve(tagName);

      if (!tag) tag = await tagController.create(tagName);

      await video.addTag(tag);
    });

    thumbnails.forEach(async (path) => {
      const thumbnail = await thumbnailController.create(path);

      await video.addThumbnail(thumbnail);
    });

    const videoLedger = {
      $class: 'com.mog.technologies.Video',
      videoID: video.id,
      price,
      date: +new Date(),
      description: `description-${video.id}-${Date.now()}`,
      uploader: `com.mog.technologies.User#${uploaderId}`,
    };

    // await axios.post(`${LEDGER_API}video`, videoLedger, authHeader);
    await composer.addVideo(videoLedger);

    res.status(201).send(video);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/videos', async (_, res) => {
  try {
    const video = await videoController.list();
    res.status(200).send(video);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/videos/most-popular/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const videos = await videoController.getMostPopular(number);

    res.status(200).send(videos);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/videos/latest/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const videos = await videoController.getLatest(number);

    res.status(200).send(videos);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});


router.get('/videos/:videoId', async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await videoController.retrieve(videoId);
    await videoController.incrementViewCount(videoId);
    res.status(200).send(video);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.put('/videos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const video = await videoController.update(id, title, description, price);
    res.status(201).send(video);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.delete('/videos/:videoId', async (req, res) => {
  const { id } = req.params;

  try {
    const video = await videoController.destroy(id);
    res.status(201).send(video);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

module.exports = router;
