const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "spotify_db",
    password: "123",
    port: 5432,
});

module.exports = pool;