const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      employees(
        eid BIGSERIAL NOT NULL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL,
        employees_password VARCHAR(200) NOT NULL,
        job_role VARCHAR(50) NOT NULL,
        department VARCHAR(50) NOT NULL,
        date_created DATE,
        last_login DATE
      )
      
      articles (
        aid BIGSERIAL NOT NULL PRIMARY KEY,
        title VARCHAR(300) NOT NULL,
        body VARCHAR,
        author_id INT,
        date_created TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES employees (eid)
      )

      gifs (
        gid BIGSERIAL NOT NULL PRIMARY KEY,
        gif VARCHAR(30) NOT NULL,
        author_id INT,
        date_created TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES employees (eid)
      )

      comments (
        cid BIGSERIAL NOT NULL PRIMARY KEY,
        comment VARCHAR(300),
        gif_id INT REFERENCES gifs(gid),
        author_id INT,
        date_created TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES employees (eid)
      )
      `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS reflections';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');