PRAGMA foreign_keys	= ON;
.mode columns
.headers on

-- Inserção de registos na tabela Categoria

INSERT INTO Categoria (idCategoria, nome) VALUES (1,'Brinquedos');
INSERT INTO Categoria (idCategoria, nome) VALUES (2,'Desporto');
INSERT INTO Categoria (idCategoria, nome) VALUES (3,'Livros');
INSERT INTO Categoria (idCategoria, nome) VALUES (4,'Mobília');
INSERT INTO Categoria (idCategoria, nome) VALUES (5,'Roupa');
INSERT INTO Categoria (idCategoria, nome) VALUES (6,'Tecnologia');

-- Inserção de registos na tabela Produto

INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (1,'Barbie','7.50',1);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (2,'Raquete de Ténis','9.89',2);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (3,'Patins','12.99',2);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (4,'Bola de Futebol','5.99',2);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (5,'Senhor dos Anéis - J.R.R. Tolkien','15.99',3);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (6,'Harry Potter e a Pedra Filosofal - J.K. Rowling','12.99',3);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (7,'A Guerra dos Tronos - George R.R. Martin','19.99',3);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (8,'Armário Branco','55.00',4);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (9,'Mesa Redonda','40.99',4);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (10,'Pólo Azul','14.59',5);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (11,'Calças de Ganga','25.70',5);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (12,'Computador Acer','239.99',6);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (13,'Computador Mac','589.99',6);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (14,'Televisão Samsung','1259.99',6);
INSERT INTO Produto (codigo, nome, custoUnitario, idCategoria) VALUES (15,'Telemóvel Samsung Galaxy S4','316.47',6);

-- Inserção de registos na tabela CodigoPostal

INSERT INTO CodigoPostal (codigoPostal, localidade) VALUES ('4200','Porto');
INSERT INTO CodigoPostal (codigoPostal, localidade) VALUES ('4585','Sobreira');
INSERT INTO CodigoPostal (codigoPostal, localidade) VALUES ('9050','Madeira');
INSERT INTO CodigoPostal (codigoPostal, localidade) VALUES ('4450','Matosinhos');
INSERT INTO CodigoPostal (codigoPostal, localidade) VALUES ('9630','Açores');
INSERT INTO CodigoPostal (codigoPostal, localidade) VALUES ('0000','Céu');
INSERT INTO CodigoPostal (codigoPostal, localidade) VALUES ('9131','Viana do Castelo');

-- Inserção de registos na tabela Cliente

INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (1,'Tomás Oliveira','up201504746@gcloud.fe.up.pt','masculino','913841212','Rua do Funchal, 25','9050');
INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (2,'Afonso Pinto','up201503316@gcloud.fe.up.pt','masculino','960138417','Rua da Sobreira, 328','4585');
INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (3,'João Fontes','up201502863@gcloud.fe.up.pt','masculino','929474190','Rua de Matosinhos, 84','4450');
INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (4,'João Moreira','up200009413@gcloud.fe.up.pt','masculino','941912131','Rua do Porto, 500','4200');
INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (5,'Jesus Cristo','up00000@gcloud.fe.up.pt','masculino','900000000','Rua do Céu, 0','0000');
INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (6,'Raúl Vidal','up199901000@gcloud.fe.up.pt','masculino','975242385','Rua do Porto, 301','4200');
INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (7,'Dina Rodrigues','up201500422@gcloud.fe.up.pt','feminino','901391218','Rua dos Açores, 57','9630');
INSERT INTO Cliente (nif, nome, email, genero, telefone, morada, codigoPostal)
	VALUES (8,'Cristina Mendes','up201023322@gcloud.fe.up.pt','feminino','941392390','Rua de Matosinhos, 97','4450');
	
-- Inserção de registos na tabela Loja

INSERT INTO Loja (idLoja, morada) VALUES (1,'Rua do Porto');
INSERT INTO Loja (idLoja, morada) VALUES (2,'Rua do Sobreira');
INSERT INTO Loja (idLoja, morada) VALUES (3,'Rua de Matosinhos');
INSERT INTO Loja (idLoja, morada) VALUES (4,'Rua dos Açores');
INSERT INTO Loja (idLoja, morada) VALUES (5,'Rua da Madeira');

-- Inserção de registos na tabela Armazenados

INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (1,1,'50');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (1,2,'150');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (2,1,'150');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (2,3,'250');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (2,5,'40');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (3,5,'42');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (4,1,'50');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (5,3,'76');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (5,4,'35');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (6,2,'240');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (6,3,'23');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (6,4,'57');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (7,1,'978');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (7,3,'10');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (8,5,'32');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (9,4,'23');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (10,3,'12');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (10,4,'54');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (11,2,'111');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (12,2,'5');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (12,3,'3');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (13,1,'6');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (14,5,'2');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (15,1,'8');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (15,3,'12');
INSERT INTO Armazenados (codigo, idLoja, quantidade) VALUES (15,5,'9');

-- Inserção de registos na tabela Especialidade

INSERT INTO Especialidade (idEspecialidade, nome, custoHorario) VALUES (1,'Atendimento',4);
INSERT INTO Especialidade (idEspecialidade, nome, custoHorario) VALUES (2,'Gestão de Produtos',5);
INSERT INTO Especialidade (idEspecialidade, nome, custoHorario) VALUES (3,'Limpeza',3);
INSERT INTO Especialidade (idEspecialidade, nome, custoHorario) VALUES (4,'Relações Públicas',6);
INSERT INTO Especialidade (idEspecialidade, nome, custoHorario) VALUES (5,'Entregas',4);

-- Inserção de registos na tabela Funcionario

INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (1,'Abel Sousa','Rua do Porto, 317','967998120',1,'4200');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (2,'Bárbara Moniz','Rua do Funchal, 40','918412121',3,'9050');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (3,'Hugo Pereira','Rua dos Açores, 12','923192109',4,'9630');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (4,'Luis Pereira','Rua dos Açores, 12','923192110',1,'9630');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (5,'Mónica Jesus','Rua do Porto, 100','982122390',3,'4200');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (6,'Olga Velosa','Rua da Sobreira, 63','960313928',1,'4585');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (7,'Pedro Teixeira','Rua da Sobreira, 51','928313810',5,'4585');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (8,'Tiago Noites','Rua da Madeira, 99','91283112',5,'9050');
INSERT INTO Funcionario (idFuncionario, nome, morada, telefone, idEspecialidade, codigoPostal)
	VALUES (9,'Vasco Noites','Rua da Madeira, 99','91283113',2,'9050');	
	
-- Inserção de registos na tabela Compra

INSERT INTO Compra (idCompra, dataInicio, horaInicio, dataFim, horaFim, idFuncionario, nif)
    VALUES (1, '2017-03-17', '19:50','2017-03-17','19:53', 1, 4);
INSERT INTO Compra (idCompra, dataInicio, horaInicio, dataFim, horaFim, idFuncionario, nif)
    VALUES (2, '2017-03-18', '14:50','2017-03-18','18:00', 6, 1);
INSERT INTO Compra (idCompra, dataInicio, horaInicio, dataFim, horaFim, idFuncionario, nif)
    VALUES (3, '2017-03-18', '15:30','2017-03-18','15:32', 6, 2);
INSERT INTO Compra (idCompra, dataInicio, horaInicio, dataFim, horaFim, idFuncionario, nif)
    VALUES (4, '2017-03-20', '16:14','2017-03-20','16:16', 4, 3);
INSERT INTO Compra (idCompra, dataInicio, horaInicio, dataFim, horaFim, idFuncionario, nif)
    VALUES (5, '2017-03-22', '23:47','2017-03-23','12:24', 1, 2);
INSERT INTO Compra (idCompra, dataInicio, horaInicio, dataFim, horaFim, idFuncionario, nif)
    VALUES (6, '2017-03-23', '07:50','2017-03-23','13:58', 4, 1);
	
-- Inserção de registos na tabela CompraProduto

INSERT INTO CompraProduto (idCompra, codigo, quantidade, idLoja) VALUES (1,7,2,1);
INSERT INTO CompraProduto (idCompra, codigo, quantidade, idLoja) VALUES (2,14,1,1);
INSERT INTO CompraProduto (idCompra, codigo, quantidade, idLoja) VALUES (3,1,3,1);
INSERT INTO CompraProduto (idCompra, codigo, quantidade, idLoja) VALUES (4,10,1,4);
INSERT INTO CompraProduto (idCompra, codigo, quantidade, idLoja) VALUES (5,12,1,1);
INSERT INTO CompraProduto (idCompra, codigo, quantidade, idLoja) VALUES (6,3,2,4);

-- Inserção de registos na tabela Entrega

INSERT INTO Entrega (idEntrega, portes, distancia, idCompra, idFuncionario) VALUES (1, '1.20', '1200', 2, 7);
INSERT INTO Entrega (idEntrega, portes, distancia, idCompra, idFuncionario) VALUES (2, '0.50', '500', 5, 8);
INSERT INTO Entrega (idEntrega, portes, distancia, idCompra, idFuncionario) VALUES (3, '2.00', '2013', 6, 7);
