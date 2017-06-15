.mode	columns
.headers	on
.nullvalue	NULL

-- Listagem de todas as compras efetuadas depois do dia 20 de Abril de 2017

Select *
FROM Compra
WHERE  (dataFim > '2017-03-20');


