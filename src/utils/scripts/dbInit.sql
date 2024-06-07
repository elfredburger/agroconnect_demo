CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "tax_id" varchar(255) NOT NULL,
  "image" varchar(255) DEFAULT null,
  "company_type" int DEFAULT null,
  "phone_number" varchar(255) DEFAULT null,
  "email" varchar(255) NOT NULL,
  "owner" int NOT NULL
  
);

CREATE TABLE "company_types" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "first_name" varchar(255) DEFAULT null,
  "last_name" varchar(255) DEFAULT null,
  "subscription" int DEFAULT null,
  "email" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "token" varchar(255) DEFAULT null
  
);

CREATE TABLE "company_permissions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null,
  "bit" int DEFAULT null
);

CREATE TABLE "company_roles" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null,
  "bit" int DEFAULT null
);

CREATE TABLE "product_type" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "product_type" int NOT NULL,
  "iso_standart" varchar(255) DEFAULT null,
  "name" varchar(255) DEFAULT null
);

CREATE TABLE "iso_standarts" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "measure_units" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "lot" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "company_id" int NOT NULL,
  "product" int NOT NULL,
  "weight" int NOT NULL,
  "description" varchar(255) NOT NULL,
  "status" int NOT NULL,
  "measure_unit" int NOT NULL,
  "creator" int NOT NULL
);

CREATE TABLE "listing_statuses" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "bids" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user" int NOT NULL,
  "company_id" int NOT NULL,
  "listing" int NOT NULL,
  "amount" int NOT NULL
);

CREATE TABLE "user_company_permissions" (
  "user_id" int NOT NULL,
  "company_id" int NOT NULL,
  "role" int,
  PRIMARY KEY ("user_id", "company_id")
);

CREATE TABLE "subscriptions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

ALTER TABLE "users" ADD FOREIGN KEY ("subscription") REFERENCES "subscriptions" ("id");

ALTER TABLE "lot" ADD FOREIGN KEY ("status") REFERENCES "listing_statuses" ("id");

ALTER TABLE "bids" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "bids" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "bids" ADD FOREIGN KEY ("listing") REFERENCES "lot" ("id");

ALTER TABLE "lot" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "lot" ADD FOREIGN KEY ("product") REFERENCES "products" ("id");

ALTER TABLE "lot" ADD FOREIGN KEY ("measure_unit") REFERENCES "measure_units" ("id");

ALTER TABLE "user_company_permissions" ADD FOREIGN KEY ("role") REFERENCES "company_roles" ("id");

ALTER TABLE "lot" ADD FOREIGN KEY ("creator") REFERENCES "users" ("id");

ALTER TABLE "user_company_permissions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_company_permissions" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("product_type") REFERENCES "product_type" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("company_type") REFERENCES "company_types" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("owner") REFERENCES "users" ("id");

--ALTER TABLE "products" ADD FOREIGN KEY ("iso_standart") REFERENCES "iso_standarts" ("id");


INSERT INTO subscriptions(name) VALUES ('Free'), ('Basic'), ('Premium'), ('Enterprise');
INSERT INTO company_types(name) VALUES ('Public'), ('Private'),('Corporation');
INSERT INTO company_roles(name, bit) VALUES ('Admin',1111), ('User',0001);
INSERT INTO listing_statuses(name) VALUES ('Open'), ('Closed'), ('Sold');
INSERT INTO users(first_name, last_name, subscription, email, password, token) VALUES ('Test', 'User', 1, 'user@a.a', '123456789', '123456789');
INSERT INTO companies(name, tax_id, company_type, phone_number, email, owner) VALUES ('Test Company', '123456789', 1, '123456789', 'company@a.a', 1);