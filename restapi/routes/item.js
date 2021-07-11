const controllers = require('../controllers');
const router = require('express').Router();
const { auth }= require('../utils');

router.get('/', controllers.item.get);

router.post('/', auth(), controllers.item.post);

router.put('/:id', auth(), controllers.item.put);

router.delete('/:id', auth(),  controllers.item.delete);

module.exports = router;