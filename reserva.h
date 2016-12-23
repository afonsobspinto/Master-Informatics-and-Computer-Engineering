

#ifndef RESERVAS_H_
#define RESERVAS_H_

#include "data.h"

#include <string>
#include "cliente.h"


class Reserva{
	Data inicio;
	Data final;
	float preco;

	Cliente c;
	Data limite100;
	Data limite50;
	std::string id;

public:
	Reserva(Data inicio, Data final, float preco_por_noite);
	Reserva(Data inicio, Data final, float preco_por_noite, std::string id);
	Data getInicio() const;
	Data getFinal() const;
	Data getLimite100() const;
	Data getLimite50() const;
	float getPreco() const;
	std::string getID() const;
};




#endif /* RESERVAS_H_ */
