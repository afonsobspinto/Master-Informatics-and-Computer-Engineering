.mode	columns
.headers	on
.nullvalue	NULL

-- Quais as Lojas onde não vendem barbies?

Select idLoja
FROM Loja
WHERE idLoja NOT IN
(SELECT idLoja
FROM Armazenados
WHERE codigo = 1);

