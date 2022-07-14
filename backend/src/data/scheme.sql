DROP DATABASE IF EXISTS god9;
CREATE DATABASE god9;
USE god9;

CREATE TABLE Todo (
  `title` VARCHAR(20) NOT NULL,
  `body` VARCHAR(255) NOT NULL,
  `type` VARCHAR(10) NOT NULL, 
  `author` VARCHAR(20),
  `isDeleted` BOOLEAN default 0,
  `order` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT ,
  -- type can be "todo" | "onProgress" | "done"
  PRIMARY KEY(id)
);

CREATE TABLE Noti (
  `id` INT NOT NULL AUTO_INCREMENT,
  `action` varchar(10),
  `payload` JSON NOT NULL,
  `todoId` INT,
  `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`todoId`) REFERENCES `Todo` (`id`),
  PRIMARY KEY(id)
);
