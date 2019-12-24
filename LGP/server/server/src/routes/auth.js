const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { userController } = require('../controllers');
const { JWT_SECRET } = require('../config/configs');
const { addParticipantLedger } = require('../composer/data.service');


router.post('/signup', async (req, res) => {
  const { username } = req.body;
  passport.authenticate('signup', { session: false }, async (err, user, info) => {
    if (!user && info) {
      return res.status(400).send(info.message);
    }

    if (!user) return res.status(400).send();

    user.update({ username },
      { returning: true });

    const { id } = user;

    try {
      const participant = {
        $class: 'com.mog.technologies.User',
        userID: id,
        name: username,
        tokens: 100,
      };

      const identity = {
        participant: `com.mog.technologies.User#${id}`,
        userID: `${id}`,
        options: {},
      };

      await addParticipantLedger(participant, identity);

      return res.json({
        message: 'Signup successful',
      });
    } catch (e) {
      return res.status(400).send(e.message);
    }
  })(req, res);
});


router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (!user && info) {
        return res.status(400).send(info.message);
      }

      if (!user) return res.status(400).send();

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const { id, username, card } = user;
        const nowDate = new Date();
        const payload = {
          username,
          id,
          exp: nowDate.setDate(nowDate.getDate() + 1),
        };
        const token = jwt.sign(payload, JWT_SECRET);

        return res.json({
          token, id, username, card,
        });
      });
      return next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post('/checkToken', async (req, res) => {
  try {
    const { token } = req.body;
    let decodedToken;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      decodedToken = decoded;
    });

    const user = await userController.retrieve(decodedToken.id);

    if (decodedToken.exp < new Date()) throw new Error('Expired Token');
    if (user.dataValues.username !== decodedToken.username) throw new Error('Invalid Token');

    console.log('\n EVERYTHING OK \n');

    res.status(200).send();
  } catch (error) {
    res.status(401).send(error.message);
  }
});
module.exports = router;
