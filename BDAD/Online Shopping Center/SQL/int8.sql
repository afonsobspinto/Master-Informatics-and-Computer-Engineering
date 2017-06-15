.mode	columns
.headers	on
.nullvalue	NULL

-- Qual a compra realizada há mais tempo, contabilizando a data actual?

SELECT idCompra, julianday('now')-julianday(dataFim) 'Days'
FROM Compra limit 1;




