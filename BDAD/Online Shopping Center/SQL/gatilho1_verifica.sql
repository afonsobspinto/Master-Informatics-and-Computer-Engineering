Select * FROM Armazenados;

INSERT INTO Compra (idCompra, dataInicio, horaInicio, dataFim, horaFim, idFuncionario, nif) VALUES (7, '2017-03-26', '08:50','2017-03-26','08:53', 4, 5);
INSERT INTO CompraProduto (idCompra, codigo, quantidade, idLoja) VALUES (7,1,3,1); 

Select * FROM Armazenados;