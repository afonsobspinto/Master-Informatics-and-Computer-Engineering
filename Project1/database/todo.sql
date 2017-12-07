CREATE TABLE category (
  cat_id   INTEGER PRIMARY KEY,
  cat_name VARCHAR NOT NULL
);

CREATE TABLE task (
  task_id          INTEGER PRIMARY KEY,
  task_name        VARCHAR                     NOT NULL,
  task_description VARCHAR                     NOT NULL,
  cat_id           INTEGER REFERENCES category NOT NULL
);

CREATE TABLE user (
  usr_username VARCHAR PRIMARY KEY,
  usr_password VARCHAR NOT NULL
);

INSERT INTO category VALUES (NULL, 'College');
INSERT INTO category VALUES (NULL, 'Work');
INSERT INTO category VALUES (NULL, 'Family');
INSERT INTO category VALUES (NULL, 'Appointments');
INSERT INTO category VALUES (NULL, 'Travels');
INSERT INTO category VALUES (NULL, 'Movies');
INSERT INTO category VALUES (NULL, 'Shopping');

INSERT INTO task VALUES (NULL, 'Task1', 'Finish this website ', 1);

INSERT INTO user VALUES ('afonso', '$2y$12$kwSuelerXAgWimHRpJBf0eLCEZhVtb/xKgUsES4yuepI.qZvAF5wG');