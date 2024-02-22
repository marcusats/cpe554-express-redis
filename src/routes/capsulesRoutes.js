const express = require('express');
const { getAllCapsules, getCapsuleById } = require('../controllers/capsulesController');
const { checkCapsulesCache } = require('../middleware/cacheMiddleware');

const capsulesRoutes = express.Router();

capsulesRoutes.get('/', checkCapsulesCache, getAllCapsules);

capsulesRoutes.get('/:id', checkCapsulesCache, getCapsuleById);

module.exports = capsulesRoutes;
