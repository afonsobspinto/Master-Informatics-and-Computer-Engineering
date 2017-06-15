.mode	columns
.headers	on
.nullvalue	NULL

-- Listagem dos três produtos mais requisitados

Select Produto.codigo, nome, SUM(quantidade)
FROM CompraProduto, Produto 
WHERE(Produto.codigo = CompraProduto.codigo)
GROUP BY nome
ORDER BY SUM(quantidade) desc limit 3;

