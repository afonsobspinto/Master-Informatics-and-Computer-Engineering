PRAGMA FOREIGN_KEYS = OFF;

DROP TRIGGER if exists atualizaStock;
DELETE FROM Compra WHERE idCompra=7;
DELETE FROM CompraProduto WHERE idCompra=7 and codigo=1;
UPDATE Armazenados SET quantidade = quantidade + 3
WHERE Armazenados.codigo = 1
AND Armazenados.idLoja = 1;