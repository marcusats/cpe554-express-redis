


exports.checkRocketsCache = async (req, res, next) => {
    console.log("Checking cache for rockets");
    try {
        const cachedData = await req.redisClient.get('rockets:all');
        
        if (cachedData) {
            console.log('Serving from cache: Rockets list');
            return res.json(JSON.parse(cachedData));
        }
        next();
    } catch (error) {
        console.error('Redis error:', error);
        next(); 
    }
};


exports.checkRocketCache = async (req, res, next) => {
    try {
        const cachedData = await req.redisClient.get(`rockets:${req.params.id}`);

        if (cachedData) {
            console.log(`Serving from cache: Rocket ID ${req.params.id}`);
            return res.json(JSON.parse(cachedData));
        }
        next();
    } catch (error) {
        console.error('Redis error:', error);
        next(); 
    }
};

exports.checkLaunchesCache = async (req, res, next) => {
    try {
        const cachedData = await req.redisClient.get('launches:all');

        if (cachedData) {
            console.log('Serving from cache: Launches list');
            return res.json(JSON.parse(cachedData));
        }
        next();
    } catch (error) {
        console.error('Redis error:', error);
        next(); 
    }
};

exports.checkLaunchCache = async (req, res, next) => {
    try {
        const cachedData = await req.redisClient.get(`launches:${req.params.id}`);
        if (cachedData) {
            console.log(`Serving from cache: Launch ID ${req.params.id}`);
            return res.json(JSON.parse(cachedData));
        }
        next();
    } catch (error) {
        console.error('Redis error:', error);
        next(); 
    }
};

exports.checkCapsulesCache = async (req, res, next) => {
    try {
        const cachedData = await req.redisClient.get('capsules:all');
        if (cachedData) {
            console.log('Serving from cache: Capsules list');
            return res.json(JSON.parse(cachedData));
        }
        next();
    } catch (error) {
        console.error('Redis error:', error);
        next(); 
    }
};

exports.checkCapsulesCache = async (req, res, next) => {
    try {
        const cachedData = await req.redisClient.get(`capsules:${req.params.id}`);
        if (cachedData) {
            console.log(`Serving from cache: Capsules ID ${req.params.id}`);
            return res.json(JSON.parse(cachedData));
        }
        next();
    } catch (error) {
        console.error('Redis error:', error);
        next(); 
    };
}



