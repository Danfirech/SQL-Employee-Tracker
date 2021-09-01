DROP DATABASE IF EXISTS tracker_db

CREATE DATABASE tracker_db

USE tracker_db

DROP TABLE IF EXISTS department
CREATE TABLE department (
  id: INT PRIMARY KEY
  department_name: VARCHAR(30) to hold department name
);

DROP TABLE IF EXISTS employee_roll
CREATE TABLE employee_roll (
id: INT PRIMARY KEY
title: VARCHAR(30) to hold role title
salary: DECIMAL to hold role salary
department_id: INT to hold reference to department role belongs to
);