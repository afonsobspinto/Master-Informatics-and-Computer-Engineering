.mode	columns
.headers	on
.nullvalue	NULL

-- Listagem de todos os clientes e número de compras
select cliente.nome, count(compra.nif) as nCompras
from cliente inner join compra on cliente.nif = compra.nif
group by cliente.nome
order by nCompras desc;


