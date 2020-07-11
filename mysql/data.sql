INSERT INTO role(name) VALUES 
	('ADMIN'),
	('PETUGAS')
	;
	
INSERT INTO users (id,username,password,firstname,active,role_id) VALUES 
	('1','admin','$2b$10$mRgncyzuVsqMzdLZ26oAkONCo3eQl8KChDDOWes9.NOGRT8n1IZNO','Administrator',1,1),
	('2','petugas','$2b$10$sMiuIx.4c9EM9SRBnaI0MuQlr/AmCzrL7J9xXZZQfmsGNPd9zZJqy','Petugas',1,2);

INSERT INTO vehicle (id, name) VALUES (1, 'Mobil'), (2, 'Motor');

INSERT INTO fare (vehicle_id,one_hour,more_one,max_pay,daily,capacity) VALUES
	(1, 2000, 1000, 20000, 50000, 5),
	(2, 1000, 500, 10000, 25000, 10);