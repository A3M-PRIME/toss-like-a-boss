
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" serial NOT NULL,
    "first_name" varchar(40) NOT NULL,
    "last_name" varchar(50) NOT NULL,
    "username" varchar(60) NOT NULL UNIQUE,
    "password" varchar(100) NOT NULL,
    "wastewise_admin" BOOLEAN NOT NULL,
    "organization_id" integer,
    CONSTRAINT "user_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "contest"
(
    "id" serial NOT NULL,
    "contest_name" varchar(100) NOT NULL,
    "access_code" integer NOT NULL,
    "compost" BOOLEAN NOT NULL,
    "start_date" varchar(25) NOT NULL,
    "start_time" varchar(25) NOT NULL,
    "end_date" varchar(25) NOT NULL,
    "end_time" varchar(25) NOT NULL,
    "organization_id" integer NOT NULL,
    CONSTRAINT "contest_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "organization"
(
    "id" serial NOT NULL,
    "organization_name" varchar(120) NOT NULL,
    CONSTRAINT "organization_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "team"
(
    "id" serial NOT NULL,
    "team_name" varchar(50) NOT NULL,
    "organization_id" integer NOT NULL,
    CONSTRAINT "team_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "score"
(
    "id" serial NOT NULL,
    "first_name" varchar(40) NOT NULL,
    "last_name" varchar(50) NOT NULL,
    "email_address" varchar(80) NOT NULL,
    "score" integer NOT NULL,
    "time" integer NOT NULL,
    "contest_id" integer NOT NULL,
    "team_id" integer NOT NULL,
    CONSTRAINT "score_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "item"
(
    "id" serial NOT NULL,
    "name" varchar(60) NOT NULL,
    "url" varchar(1000) NOT NULL,
    "receptacle" varchar(30) NOT NULL,
    "correct_count" integer,
    "number_of_instances" integer,
    "item_text" varchar(300),
    CONSTRAINT "item_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("organization_id") REFERENCES "organization"("id");

ALTER TABLE "contest" ADD CONSTRAINT "contest_fk0" FOREIGN KEY ("organization_id") REFERENCES "organization"("id");

ALTER TABLE "team" ADD CONSTRAINT "team_fk0" FOREIGN KEY ("organization_id") REFERENCES "organization"("id");

ALTER TABLE "score" ADD CONSTRAINT "score_fk0" FOREIGN KEY ("contest_id") REFERENCES "contest"("id");

ALTER TABLE "score" ADD CONSTRAINT "score_fk1" FOREIGN KEY ("team_id") REFERENCES "team"("id");