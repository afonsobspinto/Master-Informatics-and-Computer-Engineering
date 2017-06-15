-- Gatilho que atualiza a quantidade de um produto que esteja quase a esgotar na Loja

CREATE TRIGGER atualizaProduto
BEFORE INSERT ON CompraProduto
FOR EACH ROW
WHEN ((SELECT COUNT(*) FROM
		Armazenados
		WHERE Armazenados.codigo = NEW.codigo
		AND Armazenados.idLoja = NEW.idLoja
		AND Armazenados.quantidade - NEW.quantidade <= 1) >= 1)
BEGIN
	UPDATE Armazenados SET quantidade = quantidade + NEW.quantidade + 5
	WHERE Armazenados.codigo = NEW.codigo
	AND Armazenados.idLoja = NEW.idLoja;
END;
