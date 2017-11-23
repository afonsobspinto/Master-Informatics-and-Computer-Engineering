PRAGMA foreign_keys = on;

DROP TABLE IF EXISTS User;
CREATE TABLE User 
(
	user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	/*username VARCHAR NOT NULL,*/
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
	/*email TEXT NOT NULL UNIQUE,*/
	/* foto de perfil */
);

/* password: ola */
INSERT INTO User VALUES (NULL, 'afonso3', '$2y$12$k/qXGVCSRzNL/UrAYFq1suQnvyd2K5QW570eT/PoEZA3LSOk9dXZW');
INSERT INTO User VALUES (NULL, 'afonso4', '$2y$12$k/qXGVCSRzNL/UrAYFq1suQnvyd2K5QW570eT/PoEZA3LSOk9dXZW');
INSERT INTO User VALUES (NULL, 'afonso', '$2y$12$k/qXGVCSRzNL/UrAYFq1suQnvyd2K5QW570eT/PoEZA3LSOk9dXZW');
INSERT INTO User VALUES (NULL, 'tomas', '$2y$12$k/qXGVCSRzNL/UrAYFq1suQnvyd2K5QW570eT/PoEZA3LSOk9dXZW');
INSERT INTO User VALUES (NULL, 'joao', '$2y$12$k/qXGVCSRzNL/UrAYFq1suQnvyd2K5QW570eT/PoEZA3LSOk9dXZW');
INSERT INTO User VALUES (NULL, 'rita', '$2y$12$k/qXGVCSRzNL/UrAYFq1suQnvyd2K5QW570eT/PoEZA3LSOk9dXZW');

/*INSERT INTO User VALUES (NULL, 'claudia', 'claudia@gmail.com', '793f970c52ded1276b9264c742f19d1888cbaf73');
INSERT INTO User VALUES (NULL, 'afonso', 'afonso@hotmail.com', '793f970c52ded1276b9264c742f19d1888cbaf73');
INSERT INTO User VALUES (NULL, 'tomas', 'tomas@outlook.com', '793f970c52ded1276b9264c742f19d1888cbaf73');
INSERT INTO User VALUES (NULL, 'joao', 'joao@icloud.com', '793f970c52ded1276b9264c742f19d1888cbaf73');
INSERT INTO User VALUES (NULL, 'rita', 'rita@fe.up.pt', '793f970c52ded1276b9264c742f19d1888cbaf73');*/