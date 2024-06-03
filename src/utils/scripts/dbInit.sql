CREATE TABLE "Companies" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "taxId" varchar(255) NOT NULL,
  "image" varchar(255) DEFAULT null,
  "category" int DEFAULT null,
  "phoneNumber" varchar(255) DEFAULT null,
  "email" varchar(255) NOT NULL,
  "owner" int NOT NULL
  
);

CREATE TABLE "CompanyTypes" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "firstName" varchar(255) DEFAULT null,
  "lastName" varchar(255) DEFAULT null,
  "subscription" int DEFAULT null,
  "email" varchar(255) NOT NULL,
  "password " varchar(255) NOT NULL,
  "token" varchar(255) DEFAULT null
  
);

CREATE TABLE "CompanyPermissions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null,
  "bit" int DEFAULT null
);

CREATE TABLE "CompanyRoles" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null,
  "bit" int DEFAULT null
);

CREATE TABLE "ProductType" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) DEFAULT null
);

CREATE TABLE "Products" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "productType" int NOT NULL,
  "isoStandart" varchar(255) DEFAULT null,
  "name" varchar(255) DEFAULT null
);

CREATE TABLE "IsoStandarts" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "MeasureUnits" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "Lot" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "companyId" int NOT NULL,
  "product" int NOT NULL,
  "weight" int NOT NULL,
  "description" varchar(255) NOT NULL,
  "status" int NOT NULL,
  "measureUnit" int NOT NULL,
  "creator" int NOT NULL
);

CREATE TABLE "ListingStatuses" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "Bids" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user" int NOT NULL,
  "companyId" int NOT NULL,
  "listing" int NOT NULL,
  "amount" int NOT NULL
);

CREATE TABLE "UserCompanyPermissions" (
  "userId" int NOT NULL,
  "companyId" int NOT NULL,
  "role" int,
  PRIMARY KEY ("userId", "companyId")
);

CREATE TABLE "Subscriptions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL
);

ALTER TABLE "Users" ADD FOREIGN KEY ("subscription") REFERENCES "Subscriptions" ("id");

ALTER TABLE "Lot" ADD FOREIGN KEY ("status") REFERENCES "ListingStatuses" ("id");

ALTER TABLE "Bids" ADD FOREIGN KEY ("companyId") REFERENCES "Companies" ("id");

ALTER TABLE "Bids" ADD FOREIGN KEY ("user") REFERENCES "Users" ("id");

ALTER TABLE "Bids" ADD FOREIGN KEY ("listing") REFERENCES "Lot" ("id");

ALTER TABLE "Lot" ADD FOREIGN KEY ("companyId") REFERENCES "Companies" ("id");

ALTER TABLE "Lot" ADD FOREIGN KEY ("product") REFERENCES "Products" ("id");

ALTER TABLE "Lot" ADD FOREIGN KEY ("measureUnit") REFERENCES "MeasureUnits" ("id");

ALTER TABLE "UserCompanyPermissions" ADD FOREIGN KEY ("role") REFERENCES "CompanyRoles" ("id");

ALTER TABLE "Lot" ADD FOREIGN KEY ("creator") REFERENCES "Users" ("id");

ALTER TABLE "UserCompanyPermissions" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "UserCompanyPermissions" ADD FOREIGN KEY ("companyId") REFERENCES "Companies" ("id");

ALTER TABLE "Products" ADD FOREIGN KEY ("productType") REFERENCES "ProductType" ("id");

ALTER TABLE "Companies" ADD FOREIGN KEY ("category") REFERENCES "CompanyTypes" ("id");

ALTER TABLE "Companies" ADD FOREIGN KEY ("owner") REFERENCES "Users" ("id");

--ALTER TABLE "Products" ADD FOREIGN KEY ("isoStandart") REFERENCES "IsoStandarts" ("id");
