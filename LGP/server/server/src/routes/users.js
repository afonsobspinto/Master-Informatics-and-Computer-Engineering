const router = require('express').Router();
const { userController, videoController, shoppingCartController } = require('../controllers');
const composer = require('../composer/data.service');


router.get('/users', async (_, res) => {
  try {
    const users = await userController.list();
    res.status(200).send(users);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/users/shopping-cart', async (req, res) => {
  try {
    const user = await userController.retrieve(req.user);

    let cart = await user.getCart({ scope: 'withVideos' });

    if (!cart) { cart = await shoppingCartController.create(req.user); }

    res.status(200).send(cart);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.get('/users/tokens', async (req, res) => {
  try {
    const resUser = await composer.getUser(req.user);
    const user = resUser.data;
    res.status(200).json({ tokens: user.tokens });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/users/uploaded/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const uploadedVideos = await userController.getUploadedVideos(userId);
    res.status(200).json(uploadedVideos);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userController.retrieve(userId);
    res.status(200).send(user);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.put('/users/email', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userController.updateEmail(req.user, email);
    res.status(201).send(user);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.put('/users/password', async (req, res) => {
  const { password } = req.body;

  try {
    const user = await userController.updatePassword(req.user, password);
    res.status(201).send(user);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.put('/users/card', async (req, res) => {
  const { card } = req.body;

  try {
    await userController.updateCard(req.user, card);
    res.status(200).send();
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});


router.post('/users/shopping-cart', async (req, res) => {
  try {
    const cart = await shoppingCartController.create(req.user);
    res.status(201).send(cart);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.patch('/users/shopping-cart', async (req, res) => {
  const { videoId, toDelete } = req.body;

  try {
    const user = await userController.retrieve(req.user);
    let cart = await user.getCart();

    if (!cart) cart = await shoppingCartController.create(req.user);

    const video = await videoController.retrieve(videoId);

    if (toDelete) await cart.removeVideo(video);
    else await cart.addVideo(video);

    const finalCart = await shoppingCartController.retrieve(req.user);

    res.status(200).send(finalCart);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

router.delete('/users/shopping-cart', async (req, res) => {
  try {
    const cart = await shoppingCartController.create(req.user, true);

    res.status(200).send(cart);
  } catch (error) {
    if (error.code === 404) {
      res.status(404).send(error.message);
      return;
    }
    res.status(400).send(error.message);
  }
});

module.exports = router;
