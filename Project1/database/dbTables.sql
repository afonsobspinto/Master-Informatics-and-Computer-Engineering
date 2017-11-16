PRAGMA foreign_keys = on;

DROP TABLE IF EXISTS User;
CREATE TABLE User 
(
	user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	username VARCHAR NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	/* BLOB type to store profile pic: https://stackoverflow.com/questions/9357668/how-to-store-image-in-sqlite-database */ 
);

INSERT INTO User VALUES (NULL, 'claudia', 'claudia@gmail.com', 'ola');
INSERT INTO User VALUES (NULL, 'sofia', 'sofia@hotmail.com', 'ola');
INSERT INTO User VALUES (NULL, 'ines', 'ines@outlook.com', 'ola');
INSERT INTO User VALUES (NULL, 'joao', 'joao@icloud.com', 'ola');
INSERT INTO User VALUES (NULL, 'rita', 'rita@fe.up.pt', 'ola');

