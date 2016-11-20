#include "reserva.h"

Reserva::Reserva(Data inicio, Data final, float preco_por_noite) {
	this->inicio = inicio;
	this->final = final;
	limite50 = final - 15;
	limite100 = final - 30;
	preco = preco_por_noite * (final - inicio); //Se final-inicio = 0 ele nao usou o imovel
}

Data Reserva::getInicio() const {
	return inicio;
}

Data Reserva::getFinal() const {
	return final;
}

Data Reserva::getLimite100() const {
	return limite100;
}

Data Reserva::getLimite50() const {
	return limite50;
}
