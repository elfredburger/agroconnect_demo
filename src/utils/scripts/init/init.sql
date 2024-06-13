

CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "tax_id" varchar(255) NOT NULL,
  "image" varchar(255) DEFAULT null,
  "company_type_id" int DEFAULT null,
  "phone_number" varchar(255) DEFAULT null,
  "email" varchar(255) NOT NULL,
  "owner_id" int NOT NULL
  
);

CREATE TABLE "company_types" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "first_name" varchar(255) DEFAULT null,
  "last_name" varchar(255) DEFAULT null,
  "subscription_id" int DEFAULT null,
  "email" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "token" varchar(255) DEFAULT null,
  "phone" varchar(255) DEFAULT null
  
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

CREATE TABLE "product_types" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null
);

CREATE TABLE "product_sorts"(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "type_id" int DEFAULT null,
  "name" varchar(255) DEFAULT null
);

CREATE TABLE "iso_standarts" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "product_regions"(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null
);

CREATE TABLE "product_countries" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "dstu_standrats" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "code" varchar(255) NOT NULL
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "product_sorts_id" int NOT NULL,
  "product_regions_id" int NOT NULL,
  "product_countries_id" int NOT NULL,
  "dstu_standrat_id" int NOT NULL,
  "iso_standart_id" int DEFAULT null,
  "name" varchar(255) DEFAULT null,
  
  "moisture" int DEFAULT null,
  "damage" int DEFAULT null,
  "dirt" int DEFAULT null,
  "undersize" int DEFAULT null
);



CREATE TABLE "measure_units" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "lots" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "company_id" int NOT NULL,
  "product_id" int NOT NULL,
  "weight" int NOT NULL,
  "description" varchar(255) NOT NULL,
  "status_id" int NOT NULL,
  "measure_unit_id" int NOT NULL,
  "creator_id" int NOT NULL,
  "incoterm_id" int NOT NULL,
  "packaging" varchar(255) DEFAULT null

);

CREATE TABLE "listing_statuses" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "bids" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" int NOT NULL,
  "company_id" int NOT NULL,
  "listing_id" int NOT NULL,
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
CREATE TABLE "incoterms"  (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);


ALTER TABLE "users" ADD FOREIGN KEY ("subscription_id") REFERENCES "subscriptions" ("id");

ALTER TABLE "lots" ADD FOREIGN KEY ("status_id") REFERENCES "listing_statuses" ("id");

ALTER TABLE "bids" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "bids" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "bids" ADD FOREIGN KEY ("listing_id") REFERENCES "lots" ("id");

ALTER TABLE "lots" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "lots" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "lots" ADD FOREIGN KEY ("measure_unit_id") REFERENCES "measure_units" ("id");

ALTER TABLE "lots" ADD FOREIGN KEY ("incoterm_id") REFERENCES "incoterms" ("id");

ALTER TABLE "user_company_permissions" ADD FOREIGN KEY ("role") REFERENCES "company_roles" ("id");

ALTER TABLE "lots" ADD FOREIGN KEY ("creator_id") REFERENCES "users" ("id");

ALTER TABLE "user_company_permissions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_company_permissions" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");


ALTER TABLE "companies" ADD FOREIGN KEY ("company_type_id") REFERENCES "company_types" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "product_sorts" ADD FOREIGN KEY ("type_id") REFERENCES "product_types" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("iso_standart_id") REFERENCES "iso_standarts" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("product_regions_id") REFERENCES "product_regions" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("product_countries_id") REFERENCES "product_countries" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("dstu_standrat_id") REFERENCES "dstu_standrats" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("product_sorts_id") REFERENCES "product_sorts" ("id");


INSERT INTO product_types(name) VALUES ('Beef'), ('Avocadoes'), ('Buckwheat'), ('Grain'), ('Wheat'), ('Corn');
INSERT INTO product_sorts(type_id,name) VALUES (1, 'sort1'), (1, 'sort2'), (2, 'sort1'), (2, 'sort2');
INSERT INTO listing_statuses(name) VALUES ('Open'), ('Closed'), ('Sold');
INSERT INTO subscriptions(name) VALUES ('Free'), ('Basic'), ('Premium'), ('Enterprise');
INSERT INTO product_countries(name) VALUES ('Ukraine'), ('Poland'), ('Germany'), ('Italy'), ('USA'), ('Japan');
INSERT INTO product_regions(name) VALUES ('Mykolaiv Region'), ('Kyiv Region'), ('Lviv Region'), ('Sumy Region'), ('Konstantinovka Region');
INSERT INTO dstu_standrats(name, code) VALUES ('DSTU 1', 'DSTU1'), ('DSTU 2', 'DSTU2'), ('DSTU 3', 'DSTU3'), ('DSTU 4', 'DSTU4'), ('DSTU 5', 'DSTU5');
INSERT INTO iso_standarts(code, name) VALUES ('ISO 1', 'ISO1'), ('ISO 2', 'ISO2'), ('ISO 3', 'ISO3'), ('ISO 4', 'ISO4'), ('ISO 5', 'ISO5');
ALTER SEQUENCE public.iso_standarts_id_seq RESTART WITH 1;
INSERT INTO incoterms(name) VALUES ('CIF'), ('CRF'), ('CIP'),('CPT'),('DAP'),('DDP'),('DPU'),('EXW'),
('FAS'),('FCA'),('FOB');
INSERT INTO measure_units(name) VALUES ('Kilogram'), ('Ton'), ('Piece'), ('Litre'),('Metric Tone'),
('Cubic Meter'),('Cubic Foot');
INSERT INTO company_types(name) VALUES ('Public'), ('Private'),('Corporation');
INSERT INTO company_roles(name, bit) VALUES ('Admin',1111), ('User',0001);
INSERT INTO users(first_name, last_name, subscription_id, email, password, token) VALUES 
('firstname1', 'lastname1', 1, 'user1@a.a', '123456789', 'token1'),
('firstname2', 'lastname2', 2, 'user2@a.a', '123456789', 'token2'),
('firstname3', 'lastname3', 3, 'user3@a.a', '123456789', 'token3'),
('firstname4', 'lastname4', 4, 'user4@a.a', '123456789', 'token4');
INSERT INTO companies(name, tax_id, company_type_id, phone_number, email, owner_id) VALUES 
('TestCompany1', 'taxid1', 1, '123456789', 'company1@a.a', 1),
('TestCompany2', 'taxid2', 2, '123456789', 'company2@a.a', 2),
('TestCompany3', 'taxid3', 3, '123456789', 'company3@a.a', 3),
('TestCompany4', 'taxid4', 1, '123456789', 'company4@a.a', 4);
INSERT INTO products(product_sorts_id, product_regions_id, product_countries_id, dstu_standrat_id, iso_standart_id, name, moisture, damage, dirt, undersize) 
VALUES (1, 1, 1, 1, 1, 'product1', 10, 10, 10, 10), (2, 2, 2, 2, 2, 'product2', 20, 20, 20, 20), 
(3, 3, 3, 3, 3, 'product3', 30, 30, 30, 30), (4, 4, 4, 4, 4, 'product4', 40, 40, 40, 40);
INSERT INTO lots(name, company_id, product_id, weight, description, status_id, measure_unit_id, creator_id, incoterm_id, packaging) 
VALUES ('lot1', 1, 1, 100, 'description', 1, 1, 1, 1, 'packaging');










