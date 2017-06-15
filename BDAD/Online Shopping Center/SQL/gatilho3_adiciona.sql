-- Gatilho que impede criar uma Especialidade caso o
-- seu custoHorário seja inferior ao salário mínimo

CREATE TRIGGER minimumWage
BEFORE INSERT ON Especialidade
FOR EACH ROW
BEGIN
	Select CASE
		WHEN New.custoHorario <= 2
	THEN RAISE(ABORT, 'Salario invalido')
END;
END;


