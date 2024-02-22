
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const redis = require('redis');
const rocketsRoutes = require('./src/routes/rocketsRoutes');
const launchesRoutes = require('./src/routes/launchesRoutes');
const capsulesRoutes = require('./src/routes/capsulesRoutes');

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json()); 


const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD
});


redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.error('Could not connect to Redis:', err);
});


app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});


app.use('/api/rockets', rocketsRoutes);
app.use('/api/launches', launchesRoutes);
app.use('/api/capsules', capsulesRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

