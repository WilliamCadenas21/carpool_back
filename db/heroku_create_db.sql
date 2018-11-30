USE heroku_025b0710027001d;

CREATE TABLE IF NOT EXISTS `usuarios` (
	`nombres` varchar(100) NOT NULL,
	`apellidos` varchar(100) NOT NULL,
	`email_id` varchar(50) NOT NULL,
	`contraseña` varchar(40) NOT NULL,
	`usuario_valido` BOOLEAN NOT NULL,
	`placa` varchar(6),
	`edad` INT,
	`carrera` varchar(30),
	`semestre` varchar(2),
    `direccion` varchar(100),
    `barrio` varchar(30),
	PRIMARY KEY (`email_id`)
);

CREATE TABLE IF NOT EXISTS `vehiculos` (
	`placa` varchar(6) NOT NULL,
	`modelo` varchar(30) NOT NULL,
	`color` varchar(20) NOT NULL,
	`marca` varchar(20) NOT NULL,
	`email_id` varchar(30) NOT NULL,
	PRIMARY KEY (`placa`)
);

CREATE TABLE IF NOT EXISTS `viajes` (
	`ubicación_inicial` varchar(30) NOT NULL,
	`ubicación_final` varchar(30) NOT NULL,
	`id_viaje` INT(10) NOT NULL AUTO_INCREMENT,
	`hora_salida` DATETIME NOT NULL,
	PRIMARY KEY (`id_viaje`)
);

CREATE TABLE IF NOT EXISTS `pasajeros_viajes` (
	`id_viaje` INT(10) NOT NULL,
	`email_id` varchar(30) NOT NULL,
	PRIMARY KEY (`id_viaje`,`email_id`)
);

CREATE TABLE IF NOT EXISTS `conductores_viajes` (
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
