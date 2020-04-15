const { Pool } = require('pg');

const { PG_URL } = require('../../PG_URL');

const pool = new Pool({
  connectionString: PG_URL,
});

module.exports = {
  query: (text, params, cb) => {
    console.log('executed query', text);
    return pool.query(text, params, cb);
  },
};
