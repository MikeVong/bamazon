DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price integer NULL,
  stock_quantity integer NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Unending Tyranny Sword", "Weapon", 2000,2);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Deathraze Set", "Armor", 15000,5);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Minor Health Potion", "Consumable", 100,500);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Major Health Potion", "Consumable", 500,500);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Minor Mana Potion", "Consumable", 200,500);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Major Mana Potion", "Consumable", 700,500);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Brutal Gloves", "Armor", 5000,5);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Trainee's Chestplate", "Armor", 1000,50);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Novice's Sword", "Weapon", 200,2000);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("King's Sword", "Weapon", 1000,20);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Trainee's Leggin", "Armor", 1000,50);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Trainee's Armgaurd", "Armor", 1000,50);




