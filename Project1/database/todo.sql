CREATE TABLE user (
  usr_id        INTEGER PRIMARY KEY AUTOINCREMENT,
  usr_username  VARCHAR NOT NULL UNIQUE,
  usr_password  VARCHAR NOT NULL
);

CREATE TABLE todoList (
  tdl_id    INTEGER PRIMARY KEY,
  tdl_name  VARCHAR NOT NULL,
  tdl_cat   VARCHAR NOT NULL,
  usr_id    INTEGER REFERENCES user(usr_id)
);

CREATE TABLE task (
  tsk_id           INTEGER PRIMARY KEY AUTOINCREMENT,
  tsk_description  TEXT NOT NULL,
  tsk_datedue      INTEGER,
  tsk_status       INTEGER,
  tdl_id           INTEGER REFERENCES todolist(tdl_id)
);



INSERT INTO user VALUES (Null, 'afonso', '$2y$12$kwSuelerXAgWimHRpJBf0eLCEZhVtb/xKgUsES4yuepI.qZvAF5wG');

INSERT INTO todoList VALUES (NULL, 'CollegeTDL', 'College', 1);
INSERT INTO todoList VALUES (NULL, 'OthersTDL', 'Others', 1);

INSERT INTO task VALUES (NULL, 'Finish this website ', Null, Null, 1);

