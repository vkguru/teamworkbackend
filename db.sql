
CREATE TABLE employees (
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
);

CREATE TABLE articles (
    aid BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    body VARCHAR,
    author_id INT,
    date_created TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES employees (eid)
);


CREATE TABLE gifs (
    gid BIGSERIAL NOT NULL PRIMARY KEY,
    gif VARCHAR(30) NOT NULL,
    author_id INT,
    date_created TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES employees (eid)
);

CREATE TABLE comments (
    cid BIGSERIAL NOT NULL PRIMARY KEY,
    comment VARCHAR(300),
    gif_id INT REFERENCES gifs(gid),
    author_id INT,
    date_created TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES employees (eid)
);