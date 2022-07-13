DROP DATABASE IF EXISTS week2;
CREATE DATABASE week2;
USE week2;

CREATE TABLE Todo (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(20) NOT NULL,
  `body` VARCHAR(255) NOT NULL,
  `author` VARCHAR(20),
  `type` VARCHAR(10) NOT NULL, 
  `order` INT NOT NULL, 
  -- type can be "todo" | "onProgress" | "done"
  PRIMARY KEY(id)
);

CREATE TABLE Noti (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `title` VARCHAR(20) NOT NULL,
  `action` JSON NOT NULL,
  FOREIGN KEY (`cardTitle`) REFERENCES `Todo` (`title`),
);