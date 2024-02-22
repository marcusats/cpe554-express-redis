const axios = require('axios');
const { promisify } = require('util');

const BASE_URL = 'https://api.spacexdata.com/v4/launches';




exports.getAllLaunches = async (req, res) => {
    try {
        const cacheKey = 'launches:all';
        const cachedData = await req.redisClient.get(cacheKey);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const response = await axios.get(`${BASE_URL}`);
        await req.redisClient.set(cacheKey, JSON.stringify(response.data), {
            EX: 60 * 60 
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching launches data', error: error.message });
    }
};

exports.getLaunchById = async (req, res) => {
    const { id } = req.params;
    try {
        const cacheKey = `launches:${id}`;
        const cachedData = await req.redisClient.get(cacheKey);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const response = await axios.get(`${BASE_URL}/${id}`);

        if (Object.keys(response.data).length === 0) {
            return res.status(404).send({ message: 'Launch not found' });
        }

        await req.redisClient.set(cacheKey, JSON.stringify(response.data), {
            EX: 60 * 60 
        });

        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).send({ message: 'Launch not found' });
        } else {
            res.status(500).send({ message: 'Error fetching launch data', error: error.message });
        }
    }
};
