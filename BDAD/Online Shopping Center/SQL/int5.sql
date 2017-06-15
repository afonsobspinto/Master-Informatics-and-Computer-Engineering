.mode	columns
.headers	on
.nullvalue	NULL

-- Qual o custo unitário médio, o valor total, 
-- o número de unidades distintas de produtos,
-- e o valor do produto mais caro e do mais barato?

SELECT AVG(custoUnitario) "Média", SUM(custoUnitario*quantidade) "Valor total",
(SELECT COUNT(*) FROM Produto) "N de produtos", MIN(custoUnitario) "Poduto mais barato",
MAX(custoUnitario) "Produto mais caro" 
FROM Produto, Armazenados
WHERE(Produto.codigo = Armazenados.codigo);

