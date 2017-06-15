-- Gatilho que retira da Loja o número de produtos adquiridos logo após a uma compra

CREATE TRIGGER atualizaStock
AFTER INSERT ON CompraProduto
FOR EACH ROW
BEGIN
	UPDATE Armazenados SET quantidade = quantidade - NEW.quantidade 
	WHERE Armazenados.codigo = NEW.codigo
	AND Armazenados.idLoja = NEW.idLoja;
END;
