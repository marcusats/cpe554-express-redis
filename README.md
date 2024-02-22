# cpe554-express-redis

This project is a part of the CPE554 course at Stevens Institute of Technology. It demonstrates the use of Express.js with Redis for caching data from the SpaceX API. The application provides endpoints to fetch data about rockets, launches, and capsules, with caching implemented to enhance performance.

## Features

- Fetch and cache data from the SpaceX API.
- Endpoints for rockets, launches, and capsules.
- Redis used for caching data to improve response times.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/marcusats/cpe554-express-redis.git
```

2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
   Create a `.env` file in the root directory and define the following variables:
   - PORT: The port number for the server.
   - REDIS_HOST: The hostname of the Redis server.
   - REDIS_PORT The port number of the Redis server.
   - REDIS_PASSWORD: The password for the Redis server.

4. Start the server:
```bash 
npm start
```


## Usage

The application provides the following endpoints:

- `GET /api/rockets`: Fetch all rockets.
- `GET /api/rockets/:id`: Fetch a single rocket by ID.
- `GET /api/rockets/history`: Fetch the history of fetched rockets.
- `GET /api/launches`: Fetch all launches.
- `GET /api/launches/:id`: Fetch a single launch by ID.
- `GET /api/capsules`: Fetch all capsules.
- `GET /api/capsules/:id`: Fetch a single capsule by ID.

## Technologies Used

- Node.js
- Express.js
- Redis
- Axios
