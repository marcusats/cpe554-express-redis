const axios = require('axios');
const { promisify } = require('util');

const BASE_URL = 'https://api.spacexdata.com/v4/capsules';





exports.getAllCapsules = async (req, res) => {
    try {
        const cacheKey = 'capsules:all';

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
        res.status(500).send({ message: 'Error fetching capsules data', error: error.message });
    }
};

exports.getCapsuleById = async (req, res) => {
    const { id } = req.params;
    try {
        const cacheKey = `capsules:${id}`;
        
        const cachedData = await req.redisClient.get(cacheKey);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const response = await axios.get(`${BASE_URL}/${id}`);

        if (Object.keys(response.data).length === 0) {
            return res.status(404).send({ message: 'Capsule not found' });
        }

        await req.redisClient.set(cacheKey, JSON.stringify(response.data), {
            EX: 60 * 60 
        });

        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).send({ message: 'Capsule not found' });
        } else {
            res.status(500).send({ message: 'Error fetching Capsules data', error: error.message });
        }
    }
};
