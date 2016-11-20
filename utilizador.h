/*
 * utilizador.h
 *
 *  Created on: 20/11/2016
 *      Author: afonso
 */

#ifndef UTILIZADOR_H_
#define UTILIZADOR_H_

#include "cliente.h"
#include "fornecedor.h"

class Utilizador{
	Cliente *UserC;
	Fornecedor *UserF;

public:
	Utilizador(Cliente *UserC);
	Utilizador(Fornecedor *UserF);

	Cliente *getUserC();
	Fornecedor *getUserF();

};


#endif /* UTILIZADOR_H_ */
