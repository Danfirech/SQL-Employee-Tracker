DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) 
);


CREATE TABLE employee_roll (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30), 
salary  DECIMAL, 
department_id INT 
);


CREATE TABLE employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30), 
last_name VARCHAR(30), 
role_id INT, 
manager_id INT 
);