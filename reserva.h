

#ifndef RESERVAS_H_
#define RESERVAS_H_

#include "data.h"

#include <string>
#include "cliente.h"
#include "data.h"

class Reserva{
	Data inicio;
	Data final;
	float preco;

	Cliente c; // Juntar c aos parametros da Reserva
	Data limite100;
	Data limite50;
	std::string id;

public:
	Reserva(){};
	Reserva(Data inicio, Data final, float preco_por_noite);
	Reserva(Cliente c, Data inicio, Data final, float preco_por_noite);
	Reserva(Cliente c, Data inicio, Data final, float preco_por_noite, std::string id);
	Cliente getCliente() const;
	Data getInicio() const;
	Data getFinal() const;
	Data getLimite100() const;
	Data getLimite50() const;
	float getPreco() const;
	std::string getID() const;

	bool operator < (const Reserva & rhs) const;
};




#endif /* RESERVAS_H_ */
