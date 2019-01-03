USE heroku_025b0710027001d;

CREATE TABLE IF NOT EXISTS `users` (
	`names` varchar(100) NOT NULL,
	`lastNames` varchar(100) NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(40) NOT NULL,
	`emailConfirmed` BOOLEAN NOT NULL,
	`plate` varchar(6),
	`age` int(2),
	`degree` varchar(30),
	`semester` varchar(2),
    `address` varchar(100),
    `neighborhood` varchar(30),
	PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `vehicles` (
	`plate` varchar(6) NOT NULL,
	`model` varchar(30) NOT NULL,
	`color` varchar(20) NOT NULL,
	`brand` varchar(20) NOT NULL,
	`email` varchar(30) NOT NULL,
	PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `travels` (
	`id` int(1) NOT NULL auto_increment,
	`startingPoint` varchar(100) NOT NULL,
	`endPoint` varchar(100) NOT NULL,
	`date` varchar(100) NOT NULL,
    `seats` int NOT NULL,
    `state` varchar(30) NOT NULL,
    `emailDriver` varchar(30) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `riders` (
	`id` int(1) NOT NULL,
	`email` varchar(30) NOT NULL,
	PRIMARY KEY (`id`,`email`)
);


ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_fk0` FOREIGN KEY (`email`) REFERENCES `users`(`email`);

ALTER TABLE `travels` ADD CONSTRAINT `travels_fk0` FOREIGN KEY (`emailDriver`) REFERENCES `users`(`email`);

ALTER TABLE `riders` ADD CONSTRAINT `riders_fk0` FOREIGN KEY (`id`) REFERENCES `travels`(`id`);

ALTER TABLE `riders` ADD CONSTRAINT `riders_fk1` FOREIGN KEY (`email`) REFERENCES `users`(`email`);
