CREATE TABLE "users" (
  "id" serial primary key,
  "email" text not null,
  "first_name" text not null,
  "last_name" text not null,
  "username" text not null,
  "password" text not null
);