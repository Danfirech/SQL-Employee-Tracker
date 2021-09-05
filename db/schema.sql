DROP DATABASE IF EXISTS tracker_db

CREATE DATABASE tracker_db

USE tracker_db

DROP TABLE IF EXISTS department
CREATE TABLE department (
  id: INT PRIMARY KEY
  department_name: VARCHAR(30) 
);

DROP TABLE IF EXISTS employee_roll
CREATE TABLE employee_roll (
id: INT PRIMARY KEY
title: VARCHAR(30) 
salary: DECIMAL 
department_id: INT 
);

DROP TABLE IF EXISTS employee
CREATE TABLE employee (
id: INT PRIMARY KEY
first_name: VARCHAR(30) 
last_name: VARCHAR(30) 
role_id: INT 
manager_id: INT 
);