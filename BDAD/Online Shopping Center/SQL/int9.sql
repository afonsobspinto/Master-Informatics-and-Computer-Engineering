.mode	columns
.headers	on
.nullvalue	NULL

-- Qual o funcionário com o segundo custoHorário mais alto?

select funcionario.nome, custoHorario
from funcionario
join especialidade on (especialidade.idespecialidade = funcionario.idespecialidade)
where custoHorario = (select max(custohorario)
from especialidade 
where custoHorario 
not in (select max(custohorario) 
from especialidade));
		
		