//============================================================================
// Name        : ThePlaceInTheSun.cpp
// Author      : 
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <iostream>

#include "Fornecedores.h"
#include "Clientes.h"
#include "Imoveis.h"


using namespace std;

int main() {
	cout << "The Place In The Sun" << endl;

	Imovel I1("Porto");
	Imovel *H1 = new Hotel("Porto", {}, 4);
	Imovel *A1 = new Apartamento("Porto",{}, 2, true,true,true);
	Imovel *Fa1= new Flat("Porto", {});
	cout << "Fa1 é um " << Fa1->getTipo() << ", já A1 é um " << A1->getTipo();

	cout << endl << endl;
	vector<Imovel*> test = {H1, A1, Fa1};
	Fornecedor F1("Tomás",666,"Porto ou Madeira");
	Fornecedor F2("Afonso", 1, "Sobreira", test);


	return 0;
}
