USE recipes;

create table Users (id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(500), last_name VARCHAR(500), email VARCHAR(500), password VARCHAR(500));

INSERT INTO Users (name, last_name, email, password) VALUES("Лиза", "Оленцевич", "email2@email.com", "password3");
INSERT INTO Users (name, last_name, email, password) VALUES("Максим", "Дмитриев", "email4@email.com", "password4");
INSERT INTO Users (name, last_name, email, password) VALUES("Павел", "Онаньев", "email3@email.com", "password4");
INSERT INTO Users (name, last_name, email, password) VALUES("Иван", "Иванов", "email5@email.com", "password4");
INSERT INTO Users (name, last_name, email, password) VALUES("Марк", "Макр", "email6@email.com", "password4");
INSERT INTO Users (name, last_name, email, password) VALUES("Зина", "Бабушкина", "email7@email.com", "password4");

