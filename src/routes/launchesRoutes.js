const express = require('express');
const { getAllLaunches, getLaunchById } = require('../controllers/launchesController');
const { checkLaunchesCache, checkLaunchCache } = require('../middleware/cacheMiddleware');

const launchesRoutes = express.Router();

launchesRoutes.get('/', checkLaunchesCache, getAllLaunches);

launchesRoutes.get('/:id', checkLaunchCache, getLaunchById);

module.exports = launchesRoutes;
