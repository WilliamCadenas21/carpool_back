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

