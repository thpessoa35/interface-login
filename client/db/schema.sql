CREATE DATABASE postgres; 

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL, 
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE(email)
);
