#include "reserva.h"

Reserva::Reserva(Data inicio, Data final) {
	this->inicio = inicio;
	this->final = final;
}

Data Reserva::getInicio() const {
	return inicio;
}

Data Reserva::getFinal() const {
	return final;
}
