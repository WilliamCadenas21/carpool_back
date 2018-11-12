CREATE DATABASE IF NOT EXISTS carpooldb;

USE carpooldb;

CREATE TABLE `usuarios` (
	`nombres` varchar(30) NOT NULL,
	`apellidos` varchar(30) NOT NULL,
	`email_id` varchar(30) NOT NULL,
	`contraseña` varchar(30) NOT NULL,
	`usuario_valido` BOOLEAN NOT NULL,
	`placa` varchar(30),
	`edad` varchar(2),
	`carrera` varchar(30),
	`semestre` varchar(2),
	PRIMARY KEY (`email_id`)
);

CREATE TABLE `vehiculos` (
	`placa` varchar(6) NOT NULL,
	`modelo` varchar(30) NOT NULL,
	`color` varchar(20) NOT NULL,
	`marca` varchar(20) NOT NULL,
	`email_id` varchar(30) NOT NULL,
	PRIMARY KEY (`placa`)
);

CREATE TABLE `viajes` (
	`ubicación_inicial` varchar(30) NOT NULL,
	`ubicación_final` varchar(30) NOT NULL,
	`id_viaje` INT(10) NOT NULL AUTO_INCREMENT,
	`hora_salida` TIME(6) NOT NULL,
	`fecha` DATE NOT NULL,
	PRIMARY KEY (`id_viaje`)
);

CREATE TABLE `pasajeros_viajes` (
	`id_viaje` INT(10) NOT NULL,
	`email_id` varchar(30) NOT NULL,
	PRIMARY KEY (`id_viaje`,`email_id`)
);

CREATE TABLE `conductores_viajes` (
	`id_viaje` INT(10) NOT NULL,
	`email_id` varchar(30) NOT NULL,
	PRIMARY KEY (`id_viaje`,`email_id`)
);

ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_fk0` FOREIGN KEY (`placa`) REFERENCES `vehiculos`(`placa`);

ALTER TABLE `vehiculos` ADD CONSTRAINT `vehiculos_fk0` FOREIGN KEY (`email_id`) REFERENCES `usuarios`(`email_id`);

ALTER TABLE `pasajeros_viajes` ADD CONSTRAINT `pasajeros_viajes_fk0` FOREIGN KEY (`id_viaje`) REFERENCES `viajes`(`id_viaje`);

ALTER TABLE `pasajeros_viajes` ADD CONSTRAINT `pasajeros_viajes_fk1` FOREIGN KEY (`email_id`) REFERENCES `usuarios`(`email_id`);

ALTER TABLE `conductores_viajes` ADD CONSTRAINT `conductores_viajes_fk0` FOREIGN KEY (`id_viaje`) REFERENCES `viajes`(`id_viaje`);

ALTER TABLE `conductores_viajes` ADD CONSTRAINT `conductores_viajes_fk1` FOREIGN KEY (`email_id`) REFERENCES `usuarios`(`email_id`);
