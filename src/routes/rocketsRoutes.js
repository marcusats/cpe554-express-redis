
const express = require('express');
const {getAllRockets, getRocketById, getRocketsHistory } = require('../controllers/rocketsController');
const {checkRocketsCache, checkRocketCache }= require('../middleware/cacheMiddleware');

const rocketsRoutes = express.Router();


rocketsRoutes.get('/', checkRocketsCache, getAllRockets);


rocketsRoutes.get('/:id', checkRocketCache, getRocketById);


rocketsRoutes.get('/history', getRocketsHistory);


module.exports = rocketsRoutes;
