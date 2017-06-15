.mode	columns
.headers	on
.nullvalue	NULL

-- Quais as localidades onde mora alguém, seja ele cliente ou funcionário?

SELECT localidade 
FROM CodigoPostal, Cliente
WHERE CodigoPostal.codigoPostal=Cliente.codigoPostal
UNION
SELECT localidade 
FROM CodigoPostal, Funcionario
WHERE CodigoPostal.codigoPostal=Funcionario.codigoPostal;





