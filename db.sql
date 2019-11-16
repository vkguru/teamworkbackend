
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
    employee_id INT,
    author_id INT,
    date_created TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES employees (id)
);


CREATE TABLE gifs (
    gid BIGSERIAL NOT NULL PRIMARY KEY,
    employee_id  INT REFERENCES employees(eid),
    author VARCHAR UNIQUE author REFERENCES employees(username),
    date_created TIMESTAMP,
    share_gif INT[] DEFAULT ARRAY[]::INT[],
    share INT DEFAULT 0
);

CREATE TABLE comments (
    cid BIGSERIAL NOT NULL PRIMARY KEY,
    comment VARCHAR(300),
    employee_id  INT REFERENCES employees(eid),
    author VARCHAR UNIQUE author REFERENCES employees(username),
    article_id INT REFERENCES articles(aid),
    gif_id INT REFERENCES gif(gid),
    date_created TIMESTAMP,
    share_post INT[] DEFAULT ARRAY[]::INT[],
    share INT DEFAULT 0
);