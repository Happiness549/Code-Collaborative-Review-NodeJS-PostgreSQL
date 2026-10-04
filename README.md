## Creating Tables
``` sql

CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(255),
name VARCHAR(100) NOT NULL;
role user_role NOT NULL DEFAULT 'Submitter',
password_hash(255) NOT NULL,
craeted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE projects(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
created_by INTEGER NOT NULL REFERENCES users(id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_members(
id SERIAL PRIMARY KEY,
project_id INTEGER NOT NULL REFERENCES projects(id),
user_id INTEGER NOT NULL REFERENCES users(id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
assigned_members INT[] DEFAULT '{}'
);

CREATE TABLE submissions(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    file_name VARCHAR(150) NOT NULL;
    code VARCHAR(550) NOT NULL;
    project_id INT NOT NULL REFERENCES project(id,
    status submission_status DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
);

CREATE TYPE submission_status AS ENUM ('Pending', 'In_review', 'Approved', 'Changes_requested');


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL REFERENCES submissions(id),
    general_comments VARCHAR(1000) NOT NULL;
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL REFERENCES submissions(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    type comment_type NOT NULL DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL REFERENCES submissions(id),
    reviewer_id INTEGER NOT NULL REFERENCES users(id),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```