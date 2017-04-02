#include "reserva.h"
#include "utils.h"
#include <iostream>

/**
 * Construtor de uma Reserva
 */

Reserva::Reserva(Data inicio, Data final, float preco_por_noite) {
	this->inicio = inicio;
	this->final = final;
	limite50 = inicio - 15;
	limite100 = inicio - 30;
	preco = preco_por_noite * (final - inicio);
	id = random_string(16);

}

/**
 * Construtor de uma Reserva
 */

Reserva::Reserva(Data inicio, Data final, float preco_por_noite, std::string id) {
	this->inicio = inicio;
	this->final = final;
	limite50 = final - 15;
	limite100 = final - 30;
	preco = preco_por_noite * (final - inicio);
	this->id = id;
}

/**
 * Construtor de uma Reserva
 */

Reserva::Reserva(Cliente c, Data inicio, Data final, float preco_por_noite) {
	this->c = c;
	this->inicio = inicio;
	this->final = final;
	limite50 = inicio - 15;
	limite100 = inicio - 30;
	preco = preco_por_noite * (final - inicio);
	id = random_string(16);

}

/**
 * Construtor de uma Reserva
 */

Reserva::Reserva(Cliente c, Data inicio, Data final, float preco_por_noite, std::string id) {
	this->c = c;
	this->inicio = inicio;
	this->final = final;
	limite50 = final - 15;
	limite100 = final - 30;
	preco = preco_por_noite * (final - inicio);
	this->id = id;
}

/**
 * Retorna o cliente que efetuou a Reserva
 */

Cliente Reserva::getCliente() const {
    return c;
}

/**
 * Retorna a data inicial da Reserva
 */

Data Reserva::getInicio() const {
	return inicio;
}

/**
 * Retorna a data final da Reserva
 */

Data Reserva::getFinal() const {
	return final;
}

/**
 * Retorna a data limite para cancelar a reserva e receber 100% do valor pago inicialmente
 */

Data Reserva::getLimite100() const {
	return limite100;
}

/**
 * Retorna a data limite para efetuar a reserva e receber 50% do valor pago inicialmente
 */

Data Reserva::getLimite50() const {
	return limite50;
}

/**
 * Retorna o preco da Reserva
 */

float Reserva::getPreco() const {
	return preco;
}

/**
 * Retorna o id da Reserva
 */

std::string Reserva::getID() const {
	return id;
}

/**
 * Compara duas Reservas por ordem alfabetica e se o cliente for o mesmo, por Data
 */

bool Reserva::operator <(const Reserva& rhs) const {
	if (this->getCliente() == rhs.getCliente())
		return this->getFinal() < rhs.getFinal();
	return this->getCliente() < rhs.getCliente();
}
