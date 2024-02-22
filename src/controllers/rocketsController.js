const axios = require('axios');

const BASE_URL = 'https://api.spacexdata.com/v4/rockets';

exports.getAllRockets = async (req, res) => {
    const cacheKey = 'rockets:all';
    try {
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
        console.error("Error fetching rockets data", error);
        res.status(500).send({ message: 'Error fetching rockets data', error: error.message });
    }
};

exports.getRocketById = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `rockets:${id}`;
    try {
        const cachedData = await req.redisClient.get(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const response = await axios.get(`${BASE_URL}/${id}`);
        if (response.data) {
            await req.redisClient.set(cacheKey, JSON.stringify(response.data), {
                EX: 60 * 60 
            });

            await req.redisClient.lPush('rockets:history', JSON.stringify(response.data));
        }

        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).send({ message: 'Rocket not found' });
        } else {
            console.error(`Error fetching data for rocket ${id}:`, error);
            res.status(500).send({ message: 'Error fetching rocket data', error: error.message });
        }
    }
};

exports.getRocketsHistory = async (req, res) => {
    
    try {
        const historyData = await req.redisClient.lRange('rockets:history', 0, 19);
        const history = historyData.map(item => JSON.parse(item));
        res.json(history);
    } catch (error) {
        console.error("Error fetching rockets history", error);
        res.status(500).send({ message: 'Error fetching rockets history', error: error.message });
    }
};
