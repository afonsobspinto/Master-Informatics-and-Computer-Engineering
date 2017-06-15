.mode	columns
.headers	on
.nullvalue	NULL

-- Cliente responsável pela compra mais cara

Select Cliente.nome, CompraProduto.codigo, custoUnitario*quantidade
FROM Cliente, Produto, Compra, CompraProduto
WHERE (Produto.codigo = CompraProduto.codigo 
	AND Compra.idCompra = CompraProduto.idCompra 
	AND Cliente.nif = Compra.nif)
ORDER BY custoUnitario*quantidade DESC limit 1;

