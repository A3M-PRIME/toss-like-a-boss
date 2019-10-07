
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

--test data

SELECT *, (SELECT count(*)
    FROM "item") AS ct
FROM "item"
ORDER BY random()
LIMIT 15;

CREATE TABLE "item"
(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR
(100),
	"url" VARCHAR
(100),
	"receptacle" VARCHAR
(30),
	"correct_count" INTEGER,
	"number_of_instances" INTEGER
	);

INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash1', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash2', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash3', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash4', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash5', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash6', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash7', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash8', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash9', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash10', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash11', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash12', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash13', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash14', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash15', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash16', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash17', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash18', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash19', 'test.com', 'garbage', '1', '1');
INSERT into "item"
    ("name", "url", "receptacle", "correct_count", "number_of_instances")
VALUES
    ('trash20', 'test.com', 'garbage', '1', '1');
