const router = require('express').Router();
const { tagController } = require('../controllers');

router.get('/tags', async (_, res) => {
  try {
    const tag = await tagController.list();
    res.status(200).send(tag);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.post('/tags', async (req, res) => {
  const { name, isSuper } = req.body;

  try {
    const tag = await tagController.create(name, isSuper);
    res.status(201).send(tag);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/tags/most-popular/:limit', async (req, res) => {
  const { limit } = req.params;

  try {
    const videos = await tagController.getMostPopular(limit);
    res.status(200).send(videos);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/tags/:tagName/tagged-videos', async (req, res) => {
  const { tagName } = req.params;

  try {
    const tag = await tagController.retrieve(tagName);
    const videos = await tag.getVideos();
    res.status(200).send(videos);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/tags/:tagName/tagged-videos/most-popular/:number', async (req, res) => {
  const { tagName, number } = req.params;

  try {
    const tag = await tagController.retrieve(tagName);
    const videos = await tag.getVideos({
      order: [['viewCount', 'DESC']],
      limit: number,
    });

    res.status(200).send(videos);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/tags/:tagName/tagged-videos/latest/:number', async (req, res) => {
  const { tagName, number } = req.params;

  try {
    const tag = await tagController.retrieve(tagName);

    const videos = await tag.getVideos({
      order: [['createdAt', 'DESC']],
      limit: number,
    });

    res.status(200).send(videos);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

module.exports = router;
