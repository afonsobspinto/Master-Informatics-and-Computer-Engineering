#include "utilizador.h"
/*
 * utilizador.cpp
 *
 *  Created on: 20/11/2016
 *      Author: afonso
 */


Utilizador::Utilizador(Cliente* UserC) {
	this->UserC = UserC;
}

Utilizador::Utilizador(Fornecedor* UserF) {
	this->UserF = UserF;
}

Cliente* Utilizador::getUserC() {
	return UserC;
}

Fornecedor* Utilizador::getUserF() {
	return UserF;
}




