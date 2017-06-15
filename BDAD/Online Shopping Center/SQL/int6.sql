.mode	columns
.headers	on
.nullvalue	NULL

-- Que computadores estão disponíveis e em que loja?

select distinct produto.nome, produto.custoUnitario, loja.idLoja, loja.morada
from produto, loja
inner join armazenados on (produto.codigo = armazenados.codigo)
where produto.nome like 'computador%';


