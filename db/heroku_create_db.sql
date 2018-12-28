USE heroku_025b0710027001d;

CREATE TABLE IF NOT EXISTS `usuarios` (
	`nombres` varchar(100) NOT NULL,
	`apellidos` varchar(100) NOT NULL,
	`email_id` varchar(50) NOT NULL,
	`contraseña` varchar(40) NOT NULL,
	`usuario_valido` BOOLEAN NOT NULL,
	`placa` varchar(6),
	`edad` int(2),
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
	`id_viaje` int(1) NOT NULL auto_increment,
	`ubicación_inicial` varchar(100) NOT NULL,
	`ubicación_final` varchar(100) NOT NULL,
	`fecha_hora` varchar(100) NOT NULL,
    `puestos` int NOT NULL,
    `estado` varchar(30) NOT NULL,
    `email_id_conductor` varchar(30) NOT NULL,
	PRIMARY KEY (`id_viaje`)
);

CREATE TABLE IF NOT EXISTS `pasajeros_viajes` (
	`id_viaje` int(1) NOT NULL,
	`email_id` varchar(30) NOT NULL,
	PRIMARY KEY (`id_viaje`,`email_id`)
);


ALTER TABLE `vehiculos` ADD CONSTRAINT `vehiculos_fk0` FOREIGN KEY (`email_id`) REFERENCES `usuarios`(`email_id`);

ALTER TABLE `viajes` ADD CONSTRAINT `viajes_fk0` FOREIGN KEY (`email_id_conductor`) REFERENCES `usuarios`(`email_id`);

ALTER TABLE `pasajeros_viajes` ADD CONSTRAINT `pasajeros_viajes_fk0` FOREIGN KEY (`id_viaje`) REFERENCES `viajes`(`id_viaje`);

ALTER TABLE `pasajeros_viajes` ADD CONSTRAINT `pasajeros_viajes_fk1` FOREIGN KEY (`email_id`) REFERENCES `usuarios`(`email_id`);
