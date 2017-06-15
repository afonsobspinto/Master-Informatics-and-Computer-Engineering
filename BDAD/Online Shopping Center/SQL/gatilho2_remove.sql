PRAGMA FOREIGN_KEYS = OFF;

DROP TRIGGER if exists atualizaStock;
DELETE FROM Compra WHERE idCompra=7;
DELETE FROM CompraProduto WHERE idCompra=7 and codigo=14;
UPDATE Armazenados SET quantidade = quantidade -4
WHERE Armazenados.codigo = 14
AND Armazenados.idLoja = 5;