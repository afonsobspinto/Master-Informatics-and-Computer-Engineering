const router = require('express').Router();

/*+++++++++++++++++++++++++++++++++++++++++++++
 Routes
 ++++++++++++++++++++++++++++++++++++++++++++++*/

const passport = require('passport');
const auth = require('./auth');
const users = require('./users');
const videos = require('./videos');
const tags = require('./tags');

router.use('/', auth);
router.use('/api/', passport.authenticate('jwt', { session: false }));
router.use('/api/', users);
router.use('/api/', videos);
router.use('/api/', tags);
router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the Todos API!',
}));


module.exports = router;
